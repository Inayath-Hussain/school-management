import { RequestHandler } from "express";
import { IAddStudent } from "../../middlewares/student/validateAddStudent";
import { tryCatchWrapper } from "../tryCatchHandler";
import { studentService } from "../../services/student";
import { startSession } from "mongoose";
import { classService } from "../../services/class";


const controller: RequestHandler<{ id: string }, {}, IAddStudent> = async (req, res, next) => {
    const { id } = req.params;
    const { class: Class, contactDetails, dateOfBirth, feesPaid, gender, name, dateOfFeePayment } = req.body;

    const session = await startSession();

    try {


        const studentDoc = await studentService.updateStudent(id, name, dateOfBirth, gender, feesPaid, Class, contactDetails, dateOfFeePayment, session)

        if (studentDoc === null) {
            await session.abortTransaction();
            await session.endSession();
            return res.status(400).json({ message: "student doesn't exist" })
        }


        // if student class is changed
        if (Class !== studentDoc.class.toString()) {
            const classDoc = await classService.getClassById(studentDoc.class.toString(), session)
            if (classDoc !== null) {
                // remove student from the previous class's student list
                classDoc.studentList = classDoc.studentList.filter(c => c.toString() !== id)
                await classDoc.save()


                // add to the new class's student list
                const newClass = await classService.getClassById(Class, session);

                if (newClass === null) {
                    await session.abortTransaction();
                    await session.endSession();
                    return res.status(400).json({ message: "class doesnot exist" });
                }
                newClass.studentList.push(studentDoc._id)
                await newClass.save();
            }
        }


        return res.status(200).json({ message: "success" })
    }
    catch (ex) {
        console.log(ex)

        await session.abortTransaction()

        return res.status(500).json({ message: "success" });
    }
    finally {
        await session.endSession();
    }
}



export const updateStudent = tryCatchWrapper(controller);