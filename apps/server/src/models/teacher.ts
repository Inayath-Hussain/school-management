import { InferSchemaType, Schema, model } from "mongoose";
import { GenderEnum } from "./student";

const teacherSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: GenderEnum
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    contactDetails: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    assignedClass: {
        type: Schema.Types.ObjectId,
        ref: "class"
    }
})


export type ITeacher = InferSchemaType<typeof teacherSchema>

export const Teacher = model("teacher", teacherSchema)