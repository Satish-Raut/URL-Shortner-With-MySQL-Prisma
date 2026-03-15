// import bcrypt from "bcryptjs";
import argon2 from "argon2";

const hashPassword = async (password) => {
//   return bcrypt.hash(password, 12);
  return argon2.hash(password);
};

const verifyPassword = async (password, hashedPassword) => {
//   return bcrypt.compare(password, hashedPassword);
  return argon2.verify(hashedPassword, password);
};

const p1 = Array.from({ length: 80 }).fill("X").join("");
const p2 = Array.from({ length: 80 }).fill("X").join("") + Math.random();

console.log({ p1, p2 });

const hashP1 = await hashPassword(p1);
const hashP2 = await hashPassword(p2);

console.log({ hashP1, hashP2 });

console.log("\n\n");

console.log("p1 - p1", await verifyPassword(p1, hashP1));
console.log("p1 - p2", await verifyPassword(p1, hashP2));
console.log("p2 - p2", await verifyPassword(p2, hashP2));
console.log("p2 - p1", await verifyPassword(p2, hashP1));

/*
    NOTE:

    {1. What is bcryptjs?}
        - bcryptjs is a JavaScript implementation of the bcrypt hashing algorithm used to securely store passwords.

        - Instead of storing plain-text passwords in a database, bcrypt converts them into a cryptographic hash that cannot be reversed.

        - This protects user passwords even if the database is leaked.

    {2. Limitations of bcryptjs}
        - "72-byte password limit"
        - bcrypt only considers the first 72 bytes of a password.

    Example:
        password1 = "A" repeated 72 times
        password2 = "A" repeated 72 times + random characters

        - bcrypt treats both passwords as the same.

    Reason:
        (- bcrypt internally truncates passwords after 72 bytes.)

    {3. So to overcome this limitation i use `Argon2`}

*/
