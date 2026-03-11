import { Router } from "express";

import {
  getAvailabledata,
  redirectToURL,
  insertNewData,
} from "../Controllers/urlController.js";

const router = Router();

// Route to fetch all shortened URLs (for initial frontend load)
router.get("/urlshortner", getAvailabledata);

// Route to handle URL redirection
router.get("/:shortcode", redirectToURL);

// Route to add a new shortened URL to the database
router.post("/", insertNewData);

export const shortnerRouter = router;
