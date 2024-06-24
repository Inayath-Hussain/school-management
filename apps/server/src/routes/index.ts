import { Router } from "express";
import { classRouter } from "./class";
import { teacherRouter } from "./teacher";
import { studentRouter } from "./student";

const router = Router();


router.use("/class", classRouter);
router.use("/teacher", teacherRouter);
router.use("/student", studentRouter);


export { router as mainRouter }