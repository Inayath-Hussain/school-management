import { RequestHandler } from "express"
import { tryCatchWrapper } from "../tryCatchHandler"
import { IAddTeacherBody } from "../../middlewares/teacher/validateAddTeacher";
import { teacherService } from "../../services/teacher";



const controller: RequestHandler<{ id: string }, {}, IAddTeacherBody> = async (req, res, next) => {
    const { contactDetails, dateOfBirth, gender, name, salary } = req.body;
    const { id } = req.params;

    const updatedDoc = await teacherService.updateTeacher(id, name, dateOfBirth, gender, contactDetails, salary)

    if (updatedDoc === null) return res.status(400).json({ message: "teacher with provided id doesn't exist" })

    return res.status(200).json({ message: "success" })
}



export const updateTeacher = tryCatchWrapper(controller);