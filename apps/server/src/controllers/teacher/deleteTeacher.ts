import { RequestHandler } from "express";
import { teacherService } from "../../services/teacher";
import { tryCatchWrapper } from "../tryCatchHandler";

const controller: RequestHandler<{ id: string }> = async (req, res, next) => {
    const { id } = req.params;

    const deletedDoc = await teacherService.deleteTeacher(id);

    if (deletedDoc === null) return res.status(400).json({ message: "teacher with provided id doesn't exist" })

    res.status(200).json({ message: "success" })
}



export const deleteTeacher = tryCatchWrapper(controller);