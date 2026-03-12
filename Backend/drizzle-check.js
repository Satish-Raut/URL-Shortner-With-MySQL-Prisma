import {db} from "./Config/drizzleDB.js"
import { urlTable } from "./Drizzle/schema.js"

const main = async() => {
    const insertUrl = await db.insert(urlTable).values({
        url: "https://orm.drizzle.team/docs/get-started/mysql-new",
        shortCode: "learn-drizzle"
    })

    console.log(insertUrl)
}

main().catch((error)=>{
    console.log(error)
})