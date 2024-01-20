import UrlModel from "../models/url.js";
import shortid from "shortid";

export const handleCreateShortURL = async (req, res) => {
  try {
    const body = req.body;
    if (!body.url) {
      return res.status(400).json({ error: "Url is required!" });
    }

    const shortId = shortid(8);

    await UrlModel.create({
      shortId,
      redirectUrl: body.url,
    });

    return res.status(201).json({ message: "Success!", id: shortId });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
};

export const handleRedirectToOriginalRoute = async (req, res) => {
  const shortId = req.params.shortId;

  try {
    const entry = await UrlModel.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: {
            timestamps: Date.now(),
          },
        },
      }
    );

    return res.redirect(entry.redirectUrl);
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong!" });
  }
};

export const handleGetUrlAnalytics = async (req, res) => {
  const shortId = req.params.shortId;

  try {
    const url = await UrlModel.findOne({ shortId });

    return res
      .status(200)
      .json({
        totalClicks: url.visitHistory.length,
        analytics: url.visitHistory,
      });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong!" });
  }
};
