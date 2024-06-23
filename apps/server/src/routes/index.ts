import { Router } from "express";
import { classRouter } from "./class";

const router = Router();


router.use("/class", classRouter);


export { router as mainRouter }