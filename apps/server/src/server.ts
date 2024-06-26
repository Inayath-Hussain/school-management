import { app } from "./app";
import { connectToDb } from "./config/db";
import { env } from "./config/env";

function main() {
    connectToDb()
        .then(() => {
            app.listen(env.PORT, () => console.log(`server listening on port ${env.PORT} in ${env.NODE_ENV}`))
        })
}


main();