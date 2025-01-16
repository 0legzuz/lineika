import { Request, Response } from "express";
import pool from "../config/database";
import { z } from "zod";
import cloudinary from "../config/cloudinary"; // Импорт cloudinary
import { UploadedFile } from "express-fileupload"; // Импорт типа UploadedFile

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

    // Парсинг JSON для availableTimes, если оно представлено в виде строки
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
