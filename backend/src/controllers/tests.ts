import { Request, Response } from "express";
import pool from "../config/database";
import { z } from "zod";
import { Test, Question } from "../models/test";

export const addTest = async (req: Request, res: Response) => {
  try {
    const questionSchema = z.object({
      id: z.string(),
      text: z.string(),
      correctAnswer: z.string(),
      incorrectAnswers: z.array(z.string()),
    });
    const testSchema = z.object({
      id: z.string(),
      title: z.string(),
      topics: z.array(z.string()),
      questions: z.array(questionSchema),
      status: z.enum(["pending", "approved", "rejected"]).optional(),
    });
    const newTest = testSchema.parse(req.body);

    await pool.query(
      `INSERT INTO tests (id, title, topics, questions, status, createdAt, updatedAt, creatorId, modifierId)
       VALUES ($1, $2, $3, $4, $5, NOW(), NOW(), 'moderator1','moderator1')`,
      [
        newTest.id,
        newTest.title,
        newTest.topics,
        JSON.stringify(newTest.questions),
        newTest.status,
      ]
    );
    res.status(201).json(newTest);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export const getTests = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM tests");
    res.status(200).json({ tests: result.rows });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export const getTestById = async (req: Request, res: Response) => {
  try {
    const { testId } = req.params;
    const result = await pool.query("SELECT * FROM tests WHERE id = $1", [
      testId,
    ]);
    if (result.rows.length === 0) {
      res.status(404).json({ message: "Test not found" });
    } else {
      res.status(200).json({ test: result.rows[0] });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export const updateTestStatus = async (req: Request, res: Response) => {
  try {
    const { testId } = req.params;
    const statusSchema = z.enum(["pending", "approved", "rejected"]);
    const testStatus = statusSchema.parse(req.body.status);
    const result = await pool.query(
      `UPDATE tests SET status = $1 WHERE id = $2 RETURNING *`,
      [testStatus, testId]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ message: "Test not found" });
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
