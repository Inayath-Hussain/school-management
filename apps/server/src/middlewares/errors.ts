export class BodyError<T extends Record<any, any>> {
    message: string;
    errors: Partial<Record<keyof T, string>>

    constructor(message: string) {
        this.message = message;
        this.errors = {}
    }


    addFieldError(key: keyof BodyError<T>["errors"], errorMessage: string) {
        this.errors[key] = errorMessage;
    }
}



export const containsErrors = (errorObj: BodyError<Record<any, any>>): boolean => {
    if (Object.keys(errorObj.errors).length > 0) return true;
    return false;
}