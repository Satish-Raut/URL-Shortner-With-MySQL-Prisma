import { Router } from "express";

import {
  getAvailabledata,
  redirectToURL,
  insertNewData,
  deleteUrl,
  updateUrl,
} from "../Controllers/urlController.js";

const router = Router();

// Route to fetch all shortened URLs (for initial frontend load)
router.get("/urlshortner", getAvailabledata);

// Route to add a new shortened URL to the database
router.post("/", insertNewData);

// Route to update a URL by ID
router.put("/:id", updateUrl);

// Route to delete a URL by ID
router.delete("/:id", deleteUrl);

// Route to handle URL redirection (must be last)
router.get("/:shortcode", redirectToURL);

export const shortnerRouter = router;
