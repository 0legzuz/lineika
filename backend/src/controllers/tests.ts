import { Request, Response } from "express";
import pool from "../config/database";
import { z } from "zod";
import { Test, Question } from "../models/test";
import { v4 as uuidv4 } from "uuid";

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
      const test = result.rows[0];
      // Parse the questions to mix the correct and incorrect answers
      const parsedQuestions = JSON.parse(test.questions).map(
        (question: Question) => {
          // Mix correct and incorrect answers
          const allAnswers = question.incorrectAnswers.concat(
            question.correctAnswer
          );
          return {
            id: question.id,
            text: question.text,
            answers: allAnswers,
          };
        }
      );

      res.status(200).json({
        test: {
          ...test,
          questions: JSON.stringify(parsedQuestions),
        },
      });
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
// New method to check test.
export const checkTest = async (req: Request, res: Response) => {
  const { testId } = req.params;
  const { answers, userId } = req.body;

  try {
    // Get the test by id.
    const testResult = await pool.query("SELECT * FROM tests WHERE id = $1", [
      testId,
    ]);
    const test = testResult.rows[0];

    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }
    // Parse the questions.
    const questions: Question[] = JSON.parse(test.questions);
    // Check if the numbers of questions and answers match.
    if (questions.length !== answers.length) {
      return res.status(400).json({
        message: "Number of answers does not match number of questions",
      });
    }
    // Check the answers.
    let correctAnswersCount = 0;
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].correctAnswer === answers[i]) {
        correctAnswersCount++;
      }
    }
    // save the results
    let testResultId = null;
    // Check if the user is connected
    if (userId) {
      // Generate a new id
      testResultId = uuidv4();
      await pool.query(
        `INSERT INTO test_results (id, userId, testId, correctAnswersCount, totalQuestionsCount, dateCompleted)
              VALUES ($1, $2, $3, $4, $5, NOW())`,
        [testResultId, userId, testId, correctAnswersCount, questions.length]
      );
      // save each question and its result
      for (let i = 0; i < questions.length; i++) {
        await pool.query(
          `INSERT INTO question_results (id, testResultId, questionId, selectedAnswerId)
                 VALUES ($1, $2, $3, $4)`,
          [uuidv4(), testResultId, questions[i].id, answers[i]]
        );
      }
    }
    // Return the results.
    res.status(200).json({ correctAnswersCount });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getLeaderboard = async (req: Request, res: Response) => {
  console.log("getLeaderboard: Starting to load leaderboard"); // Log 1
  try {
    const result = await pool.query(`
      SELECT
          u.id AS userid,
          u.name,
          COALESCE(AVG(tr.correctAnswersCount::numeric / tr.totalQuestionsCount), 0) AS averageScore,
          COUNT(tr.id) as totalTestsTaken
      FROM
          users u
      LEFT JOIN
          test_results tr ON u.id = tr.userId
      GROUP BY
          u.id, u.name
      ORDER BY
          averageScore DESC
    `);
    console.log(
      "getLeaderboard: Database query results:",
      JSON.stringify(result.rows, null, 2)
    ); // Log 2
    res.status(200).json(result.rows);
  } catch (error: any) {
    console.error("getLeaderboard: Failed to load leaderboard", error); // Log 3
    res.status(500).json({
      message: "Failed to load leaderboard",
      error: error.message,
    });
  }
};
