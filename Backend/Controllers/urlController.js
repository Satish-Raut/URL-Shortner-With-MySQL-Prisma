import crypto from "crypto";
import {
  saveLink,
  findLinkByShortcode,
  getAllLinks,
  incrementClicks,
} from "../Models/urlModel.model.js";

export const getAvailabledata = async (req, res) => {
  try {
    const urls = await getAllLinks();
    // console.log(urls);
    res.json(urls);
  } catch (error) {
    console.error("Error fetching links:", error);
    res.status(500).json({ error: "Failed to fetch links" });
  }
};

export const redirectToURL = async (req, res) => {
  try {
    const { shortcode } = req.params;
    const link = await findLinkByShortcode(shortcode);

    if (link) {
      await incrementClicks(shortcode);
      console.log("Redirection Successfull");
      return res.redirect(link.url);
    } else {
      return res.status(404).send("<h1>URL Not Found</h1>");
    }
  } catch (error) {
    console.error("Redirection error:", error);
    res.status(500).send("Server Error");
  }
};

export const insertNewData = async (req, res) => {
  try {
    const { url, shortUrl } = req.body;

    if (!url) {
      return res.status(400).json({ error: "Original URL is required!" });
    }

    // Generate shortcode if not provided
    const shortcode = shortUrl || crypto.randomBytes(4).toString("hex");

    // Check if shortcode is already taken
    const existing = await findLinkByShortcode(shortcode);
    if (existing) {
      return res.status(400).json({ error: "Shortcode already exists!" });
    }

    // Save to database
    await saveLink(url, shortcode);

    res.status(201).json({
      message: "URL Shortened Successfully!",
      originalUrl: url,
      shortUrl: shortcode,
    });
  } catch (error) {
    console.error("Error creating link:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}