import express from "express";
const router = express.Router();
import {
  handleCreateShortURL,
  handleRedirectToOriginalRoute,
  handleGetUrlAnalytics,
} from "../controllers/url.js";

router.post("/", handleCreateShortURL);

router.get("/:shortId", handleRedirectToOriginalRoute);

router.get("/analytics/:shortId", handleGetUrlAnalytics);

export default router;
