
import { prisma } from "./lib/prismaDb.js";

async function main() {
  const createRecord = await prisma.shortLinks.create({
    data: {
      url: "https://www.geeksforgeeks.org/explore?page=1&category=Arrays&sortBy=submissions",
      shortCode: "practice-array",
    },
  });

  console.log("One record created Successfully.", createRecord);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
