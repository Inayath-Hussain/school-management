import { RequestHandler } from "express";
import { tryCatchWrapper } from "../tryCatchHandler";
import { classService } from "../../services/class";

const controller: RequestHandler<{ id: string }> = async (req, res, next) => {
    const { id } = req.params;

    const deletedDoc = await classService.deleteClass(id);

    if (deletedDoc === null) return res.status(400).json({ message: "class doesn't exist" })

    res.status(200).json({ message: "success" })
}


export const deleteClass = tryCatchWrapper(controller);