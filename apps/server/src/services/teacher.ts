import { Teacher } from "../models/teacher";

class TeacherService {
    async getTeacher(id: string) {
        return await Teacher.findById(id)
    }
}


export const teacherService = new TeacherService();