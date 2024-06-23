import { Router } from "express";

import { validateAddTeacher } from "../middlewares/teacher/validateAddTeacher";
import { addTeacher } from "../controllers/teacher/addTeacher";

import { getTeachers } from "../controllers/teacher/getTeachers";

import { validateId } from "../middlewares/class/validateId";

import { updateTeacher } from "../controllers/teacher/updateTeacher";
import { deleteTeacher } from "../controllers/teacher/deleteTeacher";

const router = Router();


router.get("/", getTeachers);
router.post("/", validateAddTeacher, addTeacher);
router.patch("/:id", validateId, validateAddTeacher, updateTeacher);
router.delete("/:id", validateId, deleteTeacher);


export { router as teacherRouter }