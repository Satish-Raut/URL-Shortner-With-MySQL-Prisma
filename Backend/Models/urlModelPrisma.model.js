import { prisma } from "../lib/prismaDb.js";

// Get all links (for the frontend list)
export const getAllLinks = async () => {
  const data = await prisma.shortLinks.findMany();
  return data;
};

// Find one link by shortcode
export const findLinkByShortcode = async (shortcode) => {
  const shortLink = await prisma.shortLinks.findUnique({
    where: {
      shortCode: shortcode,
    },
  });

  return shortLink;
};

// Save a new link
export const saveLink = async (url, shortcode) => {
  const data = await prisma.shortLinks.create({
    data: {
      url: url,
      shortCode: shortcode,
    },
  });

  return data;
};

// Update click count
export const incrementClicks = async (shortcode) => {
  await prisma.shortLinks.update({
    where: {
      shortCode: shortcode,
    },
    data: {
      clicks: { increment: 1 },
    },
  });
};
