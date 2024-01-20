import express from "express";
import { connectDb } from "./connect.js";
import urlRoutes from "./routes/url.js";
import UrlModel from "./models/url.js";
import path from "path";

const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

connectDb("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("Mongo connected."))
  .catch((err) => console.log("Mongo error!"));

app.use(express.json());

app.use("/home", async (req, res) => {
  const allUrls = await UrlModel.find();
  return res.render("home", {
    urls: allUrls,
  });
});

app.use("/url", urlRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
