import { RequestHandler } from "express";
import { isValidObjectId } from "mongoose";

export const validateId: RequestHandler<{ id: string }> = (req, res, next) => {
    const { id } = req.params;

    if (isValidObjectId(id) === false) return res.status(400).json({ message: "Invalid id" })

    return next();
}