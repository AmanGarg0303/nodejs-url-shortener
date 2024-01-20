import express from "express";
import UrlModel from "../models/url.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const allUrls = await UrlModel.find({});
  return res.render("home", {
    urls: allUrls,
  });
});

export default router;
