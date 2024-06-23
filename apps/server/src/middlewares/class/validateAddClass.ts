import { RequestHandler } from "express";
import { sanitizeAll } from "../sanitizeBase";
import { InValid, Valid } from "../interface";


export interface IAddClassBody {
    year: number
    className: string
    studentFees: number
    teacherId?: string
}

export const validateAddClass: RequestHandler<{}, {}, IAddClassBody> = (req, res, next) => {
    sanitizeAll(req.body);

    const { className, studentFees, teacherId, year } = req.body;

    const errorObj = new BodyError("Invalid body");


    // validate className and teacherId
    const classNameStatus = validateClassName("className", className)
    if (classNameStatus.valid === false) errorObj.addFieldError("className", classNameStatus.errorMessage)


    if (teacherId && typeof teacherId !== "string") {
        errorObj.addFieldError("teacherId", "teacherId should be of type string")
    }


    // validate year and studentFees
    const yearStatus = validatePositiveNumber("year", year)
    if (yearStatus.valid === false) errorObj.addFieldError("year", yearStatus.errorMessage)
    else if (year.toString().length !== 4) errorObj.addFieldError("year", "Invalid year")


    const studentFeesStatus = validatePositiveNumber("studentFees", studentFees)
    if (studentFeesStatus.valid === false) errorObj.addFieldError("studentFees", studentFeesStatus.errorMessage)



    if (Object.keys(errorObj.errors).length > 0) return res.status(422).json(errorObj);

    return next();
}








const validateClassName = (key: keyof Pick<IAddClassBody, "className" | "teacherId">, value: any): Valid | InValid => {
    switch (true) {
        case (!value):
            return { valid: false, errorMessage: `${key} is required` }

        case (typeof value !== "string"):
            return { valid: false, errorMessage: `${key} should be of type string` }


        default:
            return { valid: true }
    }
}



const validatePositiveNumber = (key: keyof Pick<IAddClassBody, "studentFees" | "year">, value: any): Valid | InValid => {
    switch (true) {
        case (!value && value !== 0):
            return { valid: false, errorMessage: `${key} is required` }

        case (typeof value !== "number"):
            return { valid: false, errorMessage: `${key} should be of type number` }


        case (value <= 0):
            return { valid: false, errorMessage: `${key} should be non zero positive number` }


        default:
            return { valid: true }
    }
}




class BodyError {
    message: string;
    errors: Partial<Record<keyof IAddClassBody, string>>

    constructor(message: string, errors = {}) {
        this.message = message;
        this.errors = errors
    }


    addFieldError(key: keyof BodyError["errors"], errorMessage: string) {
        this.errors[key] = errorMessage;
    }
}