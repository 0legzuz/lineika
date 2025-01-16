import { Request, Response } from "express";
import pool from "../config/database";
import { z } from "zod";
import { Lesson } from "../models/lesson";

export const addLesson = async (req: Request, res: Response) => {
  try {
    const lessonSchema = z.object({
      id: z.string(),
      title: z.string(),
      teacherId: z.string(),
      studentId: z.string(),
      startTime: z.string(),
      endTime: z.string(),
      price: z.number(),
      status: z.string(),
      conferenceLink: z.string().optional(),
      note: z.string().optional(),
      homework: z.string().optional(),
    });
    const newLesson = lessonSchema.parse(req.body);
    await pool.query(
      `INSERT INTO lessons (id, title, teacherId, studentId, startTime, endTime, price, status, conferenceLink, note, homework)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [
        newLesson.id,
        newLesson.title,
        newLesson.teacherId,
        newLesson.studentId,
        newLesson.startTime,
        newLesson.endTime,
        newLesson.price,
        newLesson.status,
        newLesson.conferenceLink,
        newLesson.note,
        newLesson.homework,
      ]
    );
    res.status(201).json(newLesson);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
export const getCalendar = async (req: Request, res: Response) => {
  try {
    const { userId, role } = req.params;
    const query =
      role === "student"
        ? `SELECT * FROM lessons WHERE studentId = $1`
        : `SELECT * FROM lessons WHERE teacherId = $1`;
    const result = await pool.query(query, [userId]);

    const calendarDays = result.rows.reduce((acc: any, lesson: Lesson) => {
      const date = new Date(lesson.startTime);
      const key = date.toISOString().split("T")[0];
      if (!acc[key]) {
        acc[key] = { date: date.toISOString(), events: [lesson] };
      } else {
        acc[key].events.push(lesson);
      }
      return acc;
    }, {});
    const calendarDaysArray = Object.values(calendarDays);

    res.json({ calendarDays: calendarDaysArray });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
