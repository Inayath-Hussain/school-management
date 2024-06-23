import { RequestHandler } from "express";
import { IAddTeacherBody } from "../../middlewares/teacher/validateAddTeacher";
import { teacherService } from "../../services/teacher";
import { tryCatchWrapper } from "../tryCatchHandler";



const controller: RequestHandler<{}, {}, IAddTeacherBody> = async (req, res, next) => {
    const { contactDetails, dateOfBirth, gender, name, salary } = req.body;

    await teacherService.createTeacher(name, dateOfBirth, gender, contactDetails, salary)

    return res.status(201).json({ message: "success" })
}



export const addTeacher = tryCatchWrapper(controller);