import { RequestHandler } from "express";
import { IAddClassBody } from "../../middlewares/class/validateAddClass";
import { teacherService } from "../../services/teacher";
import { classService } from "../../services/class";
import { tryCatchWrapper } from "../tryCatchHandler";


const controller: RequestHandler<{}, {}, IAddClassBody> = async (req, res, next) => {
    const { className, studentFees, teacherId, year } = req.body;

    // if teacherId is present check if document with provided id exists
    if (teacherId) {
        const teacherDoc = await teacherService.getTeacher(teacherId)

        if (teacherDoc === null) return res.status(400).json({ message: "teacher doesn't exist" })
    }


    const existingDoc = await classService.getClassByNameAndYear(className, year)

    if (existingDoc !== null) return res.status(400).json({ message: `class with name '${className}' already exists` })

    await classService.createClass(className, year, studentFees, teacherId)

    return res.status(201).json({ message: "success" })
}


export const addClass = tryCatchWrapper(controller);