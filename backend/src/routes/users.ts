import express from "express";
import { getAllUsers, getUserById, updateUser } from "../controllers/users";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.patch("/:id", updateUser);

export default router;
