import { eq, sql } from "drizzle-orm";
import { db } from "../Config/drizzleDB.js";
import { urlTable } from "../Drizzle/schema.js";

// Get all links (for the frontend list)
export const getAllLinks = async () => {
  const data = await db.select().from(urlTable);
  return data;
};

// Find one link by shortcode
export const findLinkByShortcode = async (shortcode) => {
  const links = await db
    .select()
    .from(urlTable)
    .where(eq(urlTable.shortCode, shortcode));

  return links[0] || null;
};

// Save a new link
export const saveLink = async (url, shortcode) => {
  const insertUrl = await db.insert(urlTable).values({
    url: url,
    shortCode: shortcode,
  });

  return insertUrl;
};

export const incrementClicks = async (shortcode) => {
  await db
    .update(urlTable)
    .set({ clicks: sql`${urlTable.clicks} + 1` })
    .where(eq(urlTable.shortCode, shortcode));
};

// Delete a link by ID
export const deleteLink = async (id) => {
  const result = await db.delete(urlTable).where(eq(urlTable.id, id));
  return result;
};

// Update a link by ID
export const updateLink = async (id, newUrl, newShortCode) => {
  const result = await db
    .update(urlTable)
    .set({
      url: newUrl,
      shortCode: newShortCode,
    })
    .where(eq(urlTable.id, id));
  return result;
};
