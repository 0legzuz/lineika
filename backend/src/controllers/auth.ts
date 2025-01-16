import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import pool from "../config/database";
import { z } from "zod";
import bcrypt from "bcrypt";

export const login = async (req: Request, res: Response) => {
  try {
    const loginSchema = z.object({
      login: z.string(),
      password: z.string(),
    });
    const loginData = loginSchema.parse(req.body);

    const { login, password } = loginData;

    const result = await pool.query("SELECT * FROM users WHERE login = $1", [
      login,
    ]);
    const user = result.rows[0];

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        console.log("Login success");
        res.json(user);
      } else {
        console.log("Password didn't match");
        res.status(404).json({ message: "User not found or invalid password" });
      }
    } else {
      console.log("user not found");
      res.status(404).json({ message: "User not found or invalid password" });
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const registerSchema = z.object({
      login: z.string(),
      password: z.string(),
      role: z.enum(["student", "teacher", "moderator"]),
    });
    const registerData = registerSchema.parse(req.body);
    const { login, password, role } = registerData;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password: ", hashedPassword);
    const id = uuidv4();

    await pool.query(
      `INSERT INTO users (id, name, role, login, password, createdAt, status)
         VALUES ($1, $2, $3, $4, $5, NOW(), 'новый')`,
      [id, login, role, login, hashedPassword]
    );
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    console.log("Registered user:", result.rows[0]);

    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
