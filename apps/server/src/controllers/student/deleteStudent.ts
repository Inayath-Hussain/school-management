import { RequestHandler, response } from "express";
import { tryCatchWrapper } from "../tryCatchHandler";
import { studentService } from "../../services/student";
import { classService } from "../../services/class";
import { startSession } from "mongoose";

const controller: RequestHandler<{ id: string }> = async (req, res, next) => {
    const { id } = req.params;

    const session = await startSession()

    try {
        const studentDoc = await studentService.deleteStudent(id, session);

        if (studentDoc === null) {
            await session.abortTransaction();
            await session.endSession();
            return res.status(400).json({ message: "student doesn't exist" })
        }

        const classDoc = await classService.getClassById(studentDoc.class.toString(), session)

        if (classDoc !== null) {
            classDoc.studentList = classDoc.studentList.filter(c => c.toString() !== id);
            classDoc.save();
        }

        await session.commitTransaction()
        res.status(200).json({ message: "success" })
    }
    catch (ex) {
        console.log(ex)
        await session.abortTransaction();

        res.status(500).json({ message: "Internal Server Error" })
    }
    finally {
        await session.endSession()
    }
}



export const deleteStudent = tryCatchWrapper(controller);