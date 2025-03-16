import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  getTeacherStudents,
  getStudentTeachers,
  addTeacherRelation,
  acceptStudentRelation,
} from "../controllers/users";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.patch("/:id", updateUser);
router.get("/:teacherId/students", getTeacherStudents);
router.get("/:studentId/teachers", getStudentTeachers);
router.post("/:studentId/teachers", addTeacherRelation);
// Новый маршрут: преподаватель принимает ученика
router.patch("/:teacherId/students/:studentId/accept", acceptStudentRelation);

export default router;
