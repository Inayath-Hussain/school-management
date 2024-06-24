import { ClientSession } from "mongoose";
import { Student } from "../models/student";

class StudentService {

    async createStudent(name: string, dateOfBirth: string, gender: string, feesPaid: boolean, Class: string, contactDetails: string, dateOfFeePayment?: string, session: ClientSession | null = null) {
        const newDoc = new Student({
            name,
            class: Class,
            contactDetails,
            dateOfBirth,
            feesPaid,
            dateOfFeePayment,
            gender
        })

        newDoc.$session(session)

        return await newDoc.save()
    }



    async getStudents(page: number, limit: number) {

        const skip = page ? page * limit - limit : undefined;

        return await Student.find({}, undefined, { skip, limit, populate: { path: "class", select: "className" } })
    }


    async updateStudent(id: string, name: string, dateOfBirth: string, gender: string, feesPaid: boolean, Class: string, contactDetails: string, dateOfFeePayment?: string, session: ClientSession | null = null) {
        return await Student.findByIdAndUpdate(id, {
            name,
            class: Class,
            contactDetails,
            dateOfBirth,
            feesPaid,
            dateOfFeePayment,
            gender
        }, { session })
    }



    async deleteStudent(id: string, session: ClientSession | null = null) {
        return await Student.findByIdAndDelete(id, { session });
    }
}


export const studentService = new StudentService();