import { Teacher } from "../models/teacher";

class TeacherService {
    async getTeacherById(id: string) {
        return await Teacher.findById(id)
    }


    async createTeacher(name: string, dateOfBirth: string, gender: string, contactDetails: string, salary: number) {
        const newDoc = new Teacher({
            name,
            dateOfBirth,
            contactDetails,
            salary,
            gender
        })

        return await newDoc.save()
    }



    async getTeachers(page: number, limit: number) {
        const skip = page ? page * 10 - 10 : undefined;

        return await Teacher.find({}, undefined, { skip, limit })
    }


    async updateTeacher(id: string, name: string, dateOfBirth: string, gender: string, contactDetails: string, salary: number) {
        return await Teacher.findByIdAndUpdate(id, {
            name,
            dateOfBirth,
            gender,
            contactDetails,
            salary
        })
    }



    async deleteTeacher(id: string) {
        return await Teacher.findByIdAndDelete(id)
    }
}


export const teacherService = new TeacherService();