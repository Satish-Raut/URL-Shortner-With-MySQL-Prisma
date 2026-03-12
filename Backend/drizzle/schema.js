import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

export const urlTable = mysqlTable("shortLinks", {
  id: int("id").primaryKey().autoincrement(),
  shortCode: varchar("short_code", { length: 225 }).unique().notNull(),
  url: varchar("url", { length: 500 }).notNull(),
  clicks: int("clicks").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});
