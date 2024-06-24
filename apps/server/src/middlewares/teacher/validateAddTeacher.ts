import { RequestHandler } from "express";
import { sanitizeAll } from "../sanitizeBase";
import { InValid, Valid } from "../interface";
import { PositiveNumberValidation, RequiredStringValidation, validateGender } from "../commonValidation";
import { BodyError, containsErrors } from "../errors";
import { GenderEnum } from "../../models/student";
import { isDate } from "validator";


export interface IAddTeacherBody {
    name: string
    gender: string
    dateOfBirth: string
    salary: number
    contactDetails: string
}


export const validateAddTeacher: RequestHandler<{}, {}, IAddTeacherBody> = (req, res, next) => {
    sanitizeAll(req.body);

    const { contactDetails, dateOfBirth, gender, name, salary } = req.body;

    const errorObj = new BodyError<IAddTeacherBody>("Invalid body");


    const validateRequiredString = RequiredStringValidation<keyof Omit<IAddTeacherBody, "salary">>();

    const contactDetailsStatus = validateRequiredString("contactDetails", contactDetails);
    if (contactDetailsStatus.valid === false) errorObj.addFieldError("contactDetails", contactDetailsStatus.errorMessage)


    const nameStatus = validateRequiredString("name", name)
    if (nameStatus.valid === false) errorObj.addFieldError("name", nameStatus.errorMessage);


    let genderStatus = validateRequiredString("gender", gender);
    // if previous validation passed then run another validation
    if (genderStatus.valid === true) genderStatus = validateGender(gender)
    // if either one validation failed then add field error
    if (genderStatus.valid === false) errorObj.addFieldError("gender", genderStatus.errorMessage)


    let dateOfBirthStatus = validateRequiredString("dateOfBirth", dateOfBirth)
    if (dateOfBirthStatus.valid === false) errorObj.addFieldError("dateOfBirth", dateOfBirthStatus.errorMessage)
    else {
        if (isDate(dateOfBirth) === false) errorObj.addFieldError("dateOfBirth", "dateofBirth contains invalid date")
    }



    const validatePositiveNumber = PositiveNumberValidation<keyof Pick<IAddTeacherBody, "salary">>()

    const salaryStatus = validatePositiveNumber("salary", salary)
    if (salaryStatus.valid === false) errorObj.addFieldError("salary", salaryStatus.errorMessage);



    if (containsErrors(errorObj)) return res.status(422).json(errorObj)
    return next();
}
