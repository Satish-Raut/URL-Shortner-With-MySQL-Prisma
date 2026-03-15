import { eq } from "drizzle-orm";
import { db } from "../Config/drizzleDB.js";
import { userTable } from "../Drizzle/schema.js";
import argon2 from "argon2";

// * New user data inserted into the database *
export const saveUserdata = async ({ name, email, password }) => {
  const insertData = await db
    .insert(userTable)
    .values({ name, email, password });
  console.log("User Data saved Successfully in the database.");

  return insertData;
};

// * get the user data by their emai *
export const getUserByEmail = async ({ email }) => {
  const userData = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, email));

  //   console.log(userData);
  return userData;
};

// * Hash the Password *
export const hashPassword = async (password) => {
  return await argon2.hash(password);
};

// * Compare the users give password with hashed password stored in database*
// Syntax: argon2.verify(hashedPassword, password)
export const comparePassword = async (password, hashedPassword) => {
  return await argon2.verify(hashedPassword, password);
};
