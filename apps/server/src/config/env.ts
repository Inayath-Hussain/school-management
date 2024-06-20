import { cleanEnv, port, str, url } from "envalid";


export const env = cleanEnv(process.env, {
    PORT: port({ default: 8080 }),
    NODE_ENV: str(),
    MONGODB_URL: url()
})