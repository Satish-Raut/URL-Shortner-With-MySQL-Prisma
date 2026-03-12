import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";

// The Drizzle and MySQl connection is created here
export const db = drizzle(process.env.DATABASE_URL);
