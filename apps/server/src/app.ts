import cors from "cors";
import express from "express";
import morgan from "morgan";
import { corsOptions } from "./config/corsOptions";


export const app = express();

app.use(morgan("dev"))
app.use(cors(corsOptions))


