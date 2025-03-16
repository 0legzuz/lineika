import { Request, Response } from "express";
import pool from "../config/database";
import { z } from "zod";
import cloudinary from "../config/cloudinary";
import { UploadedFile } from "express-fileupload";
import { v4 as uuidv4 } from "uuid"; // Импортируем функцию для генерации UUID

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (typeof req.body.availableTimes === "string") {
      try {
        req.body.availableTimes = JSON.parse(req.body.availableTimes);
      } catch (parseError) {
        console.warn("Не удалось парсить availableTimes:", parseError);
      }
    }
    const updateSchema = z.object({
      name: z.string().nullable().optional(),
      photo: z.string().nullable().optional(),
      birthdate: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Неверный формат даты")
        .nullable()
        .optional(),
      phone: z.string().nullable().optional(),
      gender: z.string().nullable().optional(),
      email: z.string().nullable().optional(),
      timezone: z.string().nullable().optional(),
      description: z.string().nullable().optional(),
      availableTimes: z.array(z.string()).nullable().optional(),
      class: z.string().nullable().optional(),
    });
    const updateData = updateSchema.parse(req.body);
    const transformedData = { ...updateData };
    if (req.files && req.files.photo) {
      const file = req.files.photo as UploadedFile;
      const uploadResult = await cloudinary.uploader.upload(file.tempFilePath);
      transformedData.photo = uploadResult.secure_url;
    }
    const setClause = Object.keys(transformedData)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(", ");
    const query = `UPDATE users SET ${setClause} WHERE id = $1 RETURNING *`;
    const result = await pool.query(query, [
      id,
      ...Object.values(transformedData),
    ]);
    if (result.rows.length === 0) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const getTeacherStudents = async (req: Request, res: Response) => {
  try {
    const { teacherId } = req.params;
    const query = `
      SELECT u.*, ur.status as "relationStatus"
      FROM users u
      INNER JOIN user_relations ur ON u.id = ur.studentId
      WHERE ur.teacherId = $1;
    `;
    const result = await pool.query(query, [teacherId]);
    res.json({ students: result.rows });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const getStudentTeachers = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const query = `
      SELECT u.*
      FROM users u
      INNER JOIN user_relations ur ON u.id = ur.teacherId
      WHERE ur.studentId = $1;
    `;
    const result = await pool.query(query, [studentId]);
    res.json({ teachers: result.rows });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// При добавлении связи студентом статус теперь "pending"
export const addTeacherRelation = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const { teacherId } = req.body;
    if (!teacherId) {
      return res.status(400).json({ message: "teacherId is required" });
    }
    const existing = await pool.query(
      "SELECT * FROM user_relations WHERE studentId = $1 AND teacherId = $2",
      [studentId, teacherId]
    );
    if (existing.rows.length > 0) {
      return res
        .status(400)
        .json({ message: "Teacher relation already exists" });
    }
    const newId = uuidv4();
    // Статус изначально pending – связь ожидает подтверждения преподавателя
    const result = await pool.query(
      "INSERT INTO user_relations (id, teacherId, studentId, startdate, status) VALUES ($1, $2, $3, NOW(), 'pending') RETURNING *",
      [newId, teacherId, studentId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Функция для подтверждения (принятия) связи преподавателем
export const acceptStudentRelation = async (req: Request, res: Response) => {
  try {
    const { teacherId, studentId } = req.params;
    const result = await pool.query(
      "UPDATE user_relations SET status = 'cooperate' WHERE teacherId = $1 AND studentId = $2 AND status = 'pending' RETURNING *",
      [teacherId, studentId]
    );
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Relation not found or already accepted" });
    }
    res.json(result.rows[0]);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
