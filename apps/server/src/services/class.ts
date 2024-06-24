import { ClientSession } from "mongoose";
import { Class } from "../models/class";

class ClassService {
    async createClass(className: string, year: number, studentFees: number, teacherId?: string) {
        const newDoc = new Class({
            className,
            studentFees,
            ...(teacherId ? { teacher: teacherId } : {}),
            year,
            studentList: []
        })

        return await newDoc.save();
    }



    async getClasses(page?: number, limit?: number) {
        const skip = page ? page * 10 - 10 : undefined;

        Class.find({}, {})
        return await Class.find({}, { studentList: 0, __v: 0 }, { skip, limit, populate: { path: "teacher", select: "name" } })
    }



    async updateClass(id: string, className: string, year: number, studentFees: number, teacherId?: string) {
        return await Class.findByIdAndUpdate(id, { className, year, studentFees, teacher: teacherId })
    }


    async getClassByNameAndYear(className: string, year: number) {
        return await Class.findOne({ className, year })
    }


    async deleteClass(id: string) {
        return await Class.findByIdAndDelete(id)
    }


    async getClassById(id: string, session: ClientSession | null = null) {
        return await Class.findById(id, undefined, { session })
    }
}


export const classService = new ClassService();