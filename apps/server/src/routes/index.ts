import { Router } from "express";
import { classRouter } from "./class";
import { teacherRouter } from "./teacher";

const router = Router();


router.use("/class", classRouter);
router.use("/teacher", teacherRouter);


export { router as mainRouter }