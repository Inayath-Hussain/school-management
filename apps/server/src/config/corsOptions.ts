import { CorsOptions } from "cors";
import { env } from "./env";


export const corsOptions: CorsOptions = env.isProd ?
    {

    }
    :
    {
        origin: /http:\/\/localhost:.{4}/
    }
