import { Request, Response } from "express";
import pool from "../config/database";
import { z } from "zod";
import { Lesson } from "../models/lesson";

export const addLesson = async (req: Request, res: Response) => {
  try {
    console.log("addLesson: req.body:", req.body);
    const lessonSchema = z.object({
      id: z.string(),
      title: z.string(),
      teacherid: z.string(),
      studentid: z.string(),
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
      `INSERT INTO lessons (id, title, teacherid, studentid, startTime, endTime, price, status, conferenceLink, note, homework)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [
        newLesson.id,
        newLesson.title,
        newLesson.teacherid,
        newLesson.studentid,
        newLesson.startTime,
        newLesson.endTime,
        newLesson.price,
        newLesson.status,
        newLesson.conferenceLink,
        newLesson.note,
        newLesson.homework,
      ]
    );
    console.log("addLesson: lesson added successfully:", newLesson);
    res.status(201).json(newLesson);
  } catch (error: any) {
    console.error("addLesson: Error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getCalendar = async (req: Request, res: Response) => {
  try {
    const { userId, role } = req.params;
    console.log("getCalendar: userId:", userId, "role:", role);
    const query =
      role === "student"
        ? `SELECT * FROM lessons WHERE studentid = $1`
        : `SELECT * FROM lessons WHERE teacherid = $1`;
    const result = await pool.query(query, [userId]);
    console.log("getCalendar: result.rows:", result.rows);

    const calendarDays = result.rows.reduce((acc: any, lesson: Lesson) => {
      if (!lesson.starttime) {
        console.error("getCalendar: startTime is null for lesson:", lesson);
        return acc;
      }
      let date;
      try {
        date = new Date(lesson.starttime);
        if (isNaN(date.getTime())) {
          console.error("getCalendar: Invalid Date found for lesson:", lesson);
          return acc;
        }
      } catch (error) {
        console.error(
          "getCalendar: Error parsing date:",
          error,
          "for lesson:",
          lesson
        );
        return acc;
      }

      const key = date.toISOString().split("T")[0];
      console.log("getCalendar: key:", key);
      if (!acc[key]) {
        acc[key] = { date: date.toISOString(), events: [lesson] };
      } else {
        acc[key].events.push(lesson);
      }
      return acc;
    }, {});
    const calendarDaysArray = Object.values(calendarDays);
    console.log("getCalendar: result:", calendarDaysArray);
    res.json({ calendarDays: calendarDaysArray });
  } catch (error: any) {
    console.error("getCalendar: Error:", error);
    res.status(500).json({ error: error.message });
  }
};
