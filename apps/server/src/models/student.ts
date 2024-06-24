import { InferSchemaType, Schema, model } from "mongoose";

export const GenderEnum = ["male", "female", "others"] as const;

const studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: GenderEnum,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    feesPaid: {
        type: Boolean,
        default: false
    },
    dateOfFeePayment: {
        type: Date
    },
    class: {
        type: Schema.Types.ObjectId,
        ref: "class",
        required: true
    },
    contactDetails: {
        type: String,
        required: true
    }
})



export type IStudent = InferSchemaType<typeof studentSchema>


export const Student = model("student", studentSchema)