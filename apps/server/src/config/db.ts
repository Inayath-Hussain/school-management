import mongoose from "mongoose";

import { env } from "./env";

export const connectToDb = () =>
    new Promise(resolve => {
        mongoose.connect(env.MONGODB_URL)
            .then(result => {
                console.log("connected to db");
                resolve(result);
            })
            .catch((err) => {
                console.log(err);
                process.exit(1);
            })
    })
