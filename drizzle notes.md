# Drizzle ORM Notes

## What is Drizzle ORM?

Drizzle ORM is a lightweight TypeScript/JavaScript ORM for SQL databases (MySQL, PostgreSQL, SQLite). It provides a type-safe query builder and schema definition layered on top of your database.

Your stack uses:

- `drizzle-orm`
- `drizzle-kit` (migrations, schema generation)

---

## Core concepts

1. **Schema tables** (`mysqlTable`, `sqliteTable`, `pgTable`)
   - Define columns using column types (`int`, `varchar`, `text`, `timestamp`, etc.)
   - Setup `primaryKey`, `autoincrement`, `notNull`, `defaultNow`, etc.

2. **Relations** (`relations`)
   - `one` and `many` map tables for joins and typed relation queries.

3. **Database object** (`db`) from `drizzle-orm`
   - Provides query methods: `select`, `insert`, `update`, `delete`, `execute`, etc.

4. **Migration flow**
   - Write schema in `drizzle/schema.js`.
   - `drizzle-kit generate` -> create migration file.
   - `drizzle-kit migrate` -> apply migration.
   - Optional `drizzle-kit push` for direct schema sync (non-destructive).

---

## Table definition example

```js
import { mysqlTable, int, varchar, timestamp } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

export const userTable = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const urlTable = mysqlTable("shortLinks", {
  id: int("id").autoincrement().primaryKey(),
  shortCode: varchar("short_code", { length: 225 }).unique().notNull(),
  url: varchar("url", { length: 500 }).notNull(),
  clicks: int("clicks").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  userId: int("user_id").notNull().references(() => userTable.id),
});

export const usersRelation = relations(userTable, ({ many }) => ({
  shortLinks: many(urlTable),
}));

export const urlRelation = relations(urlTable, ({ one }) => ({
  user: one(userTable, {
    fields: [urlTable.userId],
    references: [userTable.id],
  }),
}));
```

---

## Basic methods (drizzle ORM query builder)

Assume:

```js
import { db } from "../Config/drizzleDB.js";
import { urlTable } from "../Drizzle/schema.js";
import { eq } from "drizzle-orm";
```

### Select

- All rows:
  `await db.select().from(urlTable);`

- Single row by condition:
  `await db.select().from(urlTable).where(eq(urlTable.id, 10));`

- With join via relations (example):
  `await db.select().from(urlTable).where(eq(urlTable.userId, userId));`

### Insert

```js
await db.insert(urlTable).values({
  shortCode: "abc123",
  url: "https://example.com",
  userId: 8,
});
```

### Update

```js
await db.update(urlTable)
  .set({ clicks: urlTable.clicks.value + 1 })
  .where(eq(urlTable.shortCode, "abc123"));
```

### Delete

```js
await db.delete(urlTable)
  .where(eq(urlTable.id, 13));
```

---

## Relation usage pattern

For user-specific URL listing in controller:

```js
export const getAvailabledata = async (req, res) => {
  try {
    const userId = req.user.id;
    const urls = await db.select().from(urlTable).where(eq(urlTable.userId, userId));
    return res.json(urls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch links" });
  }
};
```

And when inserting to associate URL with the current user:

```js
export const saveLink = async (url, shortCode, userId) => {
  return await db.insert(urlTable).values({ url, shortCode, userId });
};
```

---

## drizzle-kit commands

- `npm run db:generate` -> create new migration from schema changes.
- `npm run db:migrate` -> apply pending migrations.
- `npm run db:push` -> apply schema changes directly without migration file.
- `npm run db:studio` -> open Drizzle studio UI.
