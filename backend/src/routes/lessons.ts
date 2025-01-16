import express from "express";
import { addLesson, getCalendar } from "../controllers/lessons";

const router = express.Router();

router.post("/", addLesson);
router.get("/:userId/:role", getCalendar);

export default router;
