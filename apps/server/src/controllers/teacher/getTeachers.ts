import { RequestHandler } from "express";
import { isNumeric } from "validator";
import { teacherService } from "../../services/teacher";
import { tryCatchWrapper } from "../tryCatchHandler";

const controller: RequestHandler = async (req, res, next) => {
    let page = 1;
    let size = 10;

    if (req.query.page && typeof req.query.page === "string" && isNumeric(req.query.page)) {
        page = Number(req.query.page)
    }


    const docs = await teacherService.getTeachers(page, size);

    return res.status(200).json(docs)
}



export const getTeachers = tryCatchWrapper(controller);