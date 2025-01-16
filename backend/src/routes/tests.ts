import express from "express";
import {
  addTest,
  getTestById,
  getTests,
  updateTestStatus,
} from "../controllers/tests";

const router = express.Router();
router.get("/", getTests);
router.get("/:testId", getTestById);
router.post("/", addTest);
router.patch("/:testId", updateTestStatus);

export default router;
