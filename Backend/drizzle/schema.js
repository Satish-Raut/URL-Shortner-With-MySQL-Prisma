import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

// Schema for URL table
export const urlTable = mysqlTable("shortLinks", {
  id: int("id").primaryKey().autoincrement(),
  shortCode: varchar("short_code", { length: 225 }).unique().notNull(),
  url: varchar("url", { length: 500 }).notNull(),
  clicks: int("clicks").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

// Schema for Users data table
export const userTable = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});
