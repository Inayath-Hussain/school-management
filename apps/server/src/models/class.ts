import { InferSchemaType, Schema, model } from "mongoose";

const classSchema = new Schema({
    year: {
        type: Number,
        required: true
    },
    className: {
        type: String,
        required: true
    },
    studentFees: {
        type: Number,
        required: true,
        min: [0, "studentFees cannot be negative"]
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: "teacher"
    },
    studentList: [{
        type: Schema.Types.ObjectId,
        ref: "student",
        required: true
    }]
})


export type IClass = InferSchemaType<typeof classSchema>;

export const Class = model("class", classSchema);