import { Router } from "express";
import { validateAddClass } from "../middlewares/class/validateAddClass";
import { addClass } from "../controllers/class/addClass";

import { getAllClasses } from "../controllers/class/getAllClasses";


import { updateClass } from "../controllers/class/updateClass";

import { deleteClass } from "../controllers/class/deleteClass";
import { validateId } from "../middlewares/class/validateId";

const router = Router();


router.get("/", getAllClasses);
router.post("/", validateAddClass, addClass);
router.patch("/:id", validateId, validateAddClass, updateClass);
router.delete("/:id", validateId, deleteClass);


export { router as classRouter }