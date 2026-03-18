import { relations } from "drizzle-orm";
import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";


// Schema for Users data table
export const userTable = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

// Schema for URL table
export const urlTable = mysqlTable("shortLinks", {
  id: int("id").primaryKey().autoincrement(),
  shortCode: varchar("short_code", { length: 225 }).unique().notNull(),
  url: varchar("url", { length: 500 }).notNull(),
  clicks: int("clicks").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  userId: int("user_id")
    .notNull()
    .references(() => userTable.id), //{ This is foregin key which conncts to the user table}
});


// {1. A single user can have multiple short urls}
export const usersRelation = relations(userTable, ({ many }) => ({
  shortLinks: many(urlTable),
}));

// {2. A single short link belongs to a single user}
export const urlRelation = relations(urlTable, ({ one }) => ({
  user: one(userTable, {
    fields: [urlTable.userId],
    references: [userTable.id],
  }),
}));
