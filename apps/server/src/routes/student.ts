import { Router } from "express";
import { validateAddStudent } from "../middlewares/student/validateAddStudent";
import { addStudent } from "../controllers/student/addStudent";
import { getStudents } from "../controllers/student/getStudents";
import { validateId } from "../middlewares/validateId";
import { updateStudent } from "../controllers/student/updateStudent";
import { deleteStudent } from "../controllers/student/deleteStudent";

const router = Router();


router.get("/", getStudents);
router.post("/", validateAddStudent, addStudent);
router.patch("/:id", validateId, validateAddStudent, updateStudent);
router.delete("/:id", validateId, deleteStudent);

export { router as studentRouter }