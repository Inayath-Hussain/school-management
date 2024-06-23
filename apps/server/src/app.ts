import cors from "cors";
import express from "express";
import morgan from "morgan";
import { corsOptions } from "./config/corsOptions";
import { mainRouter } from "./routes";
import { errorHandler } from "./controllers/errorHandler";


export const app = express();

app.use(morgan("dev"))
app.use(cors(corsOptions))
app.use(express.json())


app.use("/api", mainRouter);




app.use(errorHandler);