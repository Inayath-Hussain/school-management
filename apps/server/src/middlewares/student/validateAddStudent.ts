import { RequestHandler } from "express";
import { isDate } from "validator";

import { sanitizeAll } from "../sanitizeBase";
import { RequiredStringValidation, validateGender } from "../commonValidation";
import { BodyError, containsErrors } from "../errors";


export interface IAddStudent {
    name: string
    gender: string
    dateOfBirth: string
    feesPaid: boolean
    dateOfFeePayment?: string
    class: string
    contactDetails: string
}


export const validateAddStudent: RequestHandler<{}, {}, IAddStudent> = (req, res, next) => {
    sanitizeAll(req.body)

    const { class: Class, contactDetails, dateOfBirth, feesPaid, gender, name, dateOfFeePayment } = req.body;


    const errorObj = new BodyError<IAddStudent>("Invalid body");


    const validateRequiredString = RequiredStringValidation<keyof IAddStudent>();

    const nameStatus = validateRequiredString("name", name)
    if (nameStatus.valid === false) errorObj.addFieldError("name", nameStatus.errorMessage);


    const contactDetailsStatus = validateRequiredString("contactDetails", contactDetails);
    if (contactDetailsStatus.valid === false) errorObj.addFieldError("contactDetails", contactDetailsStatus.errorMessage)


    const ClassStatus = validateRequiredString("class", Class);
    if (ClassStatus.valid === false) errorObj.addFieldError("class", ClassStatus.errorMessage)


    let genderStatus = validateRequiredString("gender", gender);

    if (genderStatus.valid === true) {
        genderStatus = validateGender(gender)
    }
    if (genderStatus.valid === false) errorObj.addFieldError("gender", genderStatus.errorMessage)



    let dateOfBirthStatus = validateRequiredString("dateOfBirth", dateOfBirth)
    if (dateOfBirthStatus.valid === false) errorObj.addFieldError("dateOfBirth", dateOfBirthStatus.errorMessage)
    else {
        if (isDate(dateOfBirth) === false) errorObj.addFieldError("dateOfBirth", "dateofBirth contains invalid date")
    }


    if (dateOfFeePayment && typeof dateOfFeePayment !== "string") errorObj.addFieldError("dateOfFeePayment", "dateOfFeePayment should be of type string")
    if (dateOfFeePayment && isDate(dateOfFeePayment) === false) errorObj.addFieldError("dateOfFeePayment", "dateOfFeePayment contains invalid date")


    if (feesPaid !== undefined && typeof feesPaid !== "boolean") errorObj.addFieldError("feesPaid", "feesPaid should be of type boolean")


    if (containsErrors(errorObj)) return res.status(422).json(errorObj);


    return next();
}