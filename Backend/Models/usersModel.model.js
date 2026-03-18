import { eq } from "drizzle-orm";
import { db } from "../Config/drizzleDB.js";
import { userTable } from "../Drizzle/schema.js";


// * New user data inserted into the database *
export const saveUserdata = async ({ name, email, password }) => {
  const insertData = await db
    .insert(userTable)
    .values({ name, email, password });
  console.log("User Data saved Successfully in the database.");

  return insertData;
};

// * get the user data by their email *
export const getUserByEmail = async ({ email }) => {
  const userData = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, email));

  //   console.log(userData);
  return userData;
};

// * get the user data by their id *
export const getUserById = async ({ id }) => {
  const userData = await db
    .select()
    .from(userTable)
    .where(eq(userTable.id, id));

  //   console.log(userData);
  return userData;
};

// // * Hash the Password *
// export const hashPassword = async (password) => {
//   return await argon2.hash(password);
// };

// // * Compare the users give password with hashed password stored in database*
// // Syntax: argon2.verify(hashedPassword, password)
// export const comparePassword = async (password, hashedPassword) => {
//   return await argon2.verify(hashedPassword, password);
// };

// // *Generate the JWT token using jwt.sign() method*
// export const generateTocken = ({ id, name, email }) => {
//   if (!process.env.JWT_KEY) {
//     throw new Error("JWT_KEY is not set in environment variables");
//   }

//   return jwt.sign({ id, name, email }, process.env.JWT_KEY, {
//     expiresIn: "30d",
//   });
// };
