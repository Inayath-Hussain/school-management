import { RequestHandler } from "express";
import { IAddClassBody } from "../../middlewares/class/validateAddClass";
import { teacherService } from "../../services/teacher";
import { classService } from "../../services/class";
import { tryCatchWrapper } from "../tryCatchHandler";
import { isValidObjectId } from "mongoose";


const controller: RequestHandler<{ id: string }, {}, IAddClassBody> = async (req, res, next) => {
    const { className, studentFees, teacherId, year } = req.body;
    const { id } = req.params;

    // if teacherId is present check if document with provided id exists
    if (teacherId) {
        const teacherDoc = await teacherService.getTeacherById(teacherId)

        if (teacherDoc === null) return res.status(400).json({ message: "teacher doesn't exist" })
    }


    const updatedDoc = await classService.updateClass(id, className, year, studentFees, teacherId)

    if (updatedDoc === null) return res.status(400).json({ message: "class with provided id doesn't exist" })

    return res.status(200).json({ message: "success" })
}


export const updateClass = tryCatchWrapper(controller);