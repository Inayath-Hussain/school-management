import { RequestHandler } from "express";
import { IAddStudent } from "../../middlewares/student/validateAddStudent";
import { classService } from "../../services/class";
import { studentService } from "../../services/student";
import { tryCatchWrapper } from "../tryCatchHandler";
import { startSession } from "mongoose";

const controller: RequestHandler<{}, {}, IAddStudent> = async (req, res, next) => {
    const { class: Class, contactDetails, dateOfBirth, feesPaid, gender, name, dateOfFeePayment } = req.body;


    const session = await startSession();
    session.startTransaction();

    try {
        const classDoc = await classService.getClassById(Class, session)

        if (classDoc === null) return res.status(400).json({ message: "class doesn't exist" })

        // create student doc
        const studentDoc = await studentService.createStudent(name, dateOfBirth, gender, feesPaid, Class, contactDetails, dateOfFeePayment, session)

        // update class
        classDoc.studentList.push(studentDoc._id)

        await classDoc.save();

        await session.commitTransaction();

        return res.status(201).json({ message: "success" })
    }
    catch (ex) {
        console.log(ex)

        await session.abortTransaction()

        return res.status(500).json({ message: "Internal server error" })
    }
    finally {
        await session.endSession();
    }
}




export const addStudent = tryCatchWrapper(controller);