import express from "express";
import {
  addTest,
  checkTest,
  getTestById,
  getTests,
  updateTestStatus,
  getLeaderboard,
} from "../controllers/tests";

const router = express.Router();

// GET /api/tests/leaderboard - MUST COME BEFORE /:testId
router.get("/leaderboard", getLeaderboard);

// The others routes
router.get("/", getTests);
router.get("/:testId", getTestById);
router.post("/", addTest);
router.patch("/:testId", updateTestStatus);
router.post("/:testId/check", checkTest);

export default router;
