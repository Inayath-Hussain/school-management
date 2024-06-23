import { InValid, Valid } from "./interface"


export const PositiveNumberValidation = <T extends string>() => (key: T, value: any): Valid | InValid => {
    switch (true) {
        case (!value && value !== 0):
            return { valid: false, errorMessage: `${key} is required` }

        case (typeof value !== "number"):
            return { valid: false, errorMessage: `${key} should be of type number` }


        case (value <= 0):
            return { valid: false, errorMessage: `${key} should be non zero positive number` }


        default:
            return { valid: true }
    }
}





export const RequiredStringValidation = <T extends string>() => (key: T, value: any): Valid | InValid => {
    switch (true) {
        case (!value):
            return { valid: false, errorMessage: `${key} is required` }

        case (typeof value !== "string"):
            return { valid: false, errorMessage: `${key} should be of type string` }


        default:
            return { valid: true }
    }
}