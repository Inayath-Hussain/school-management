import { RequestHandler } from "express";
import { tryCatchWrapper } from "../tryCatchHandler";
import { isNumeric } from "validator";
import { studentService } from "../../services/student";

const controller: RequestHandler = async (req, res, next) => {

    let page = 1;
    let size = 10;

    if (req.query.page && typeof req.query.page === "string" && isNumeric(req.query.page)) {
        page = Number(req.query.page)
    }


    const docs = await studentService.getStudents(page, size);

    return res.status(200).json(docs)

}



export const getStudents = tryCatchWrapper(controller);