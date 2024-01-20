import express from "express";
import { connectDb } from "./connect.js";
import urlRoutes from "./routes/url.js";

const app = express();
const PORT = 8000;

app.set("view engine", "ejs");

connectDb("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("Mongo connected."))
  .catch((err) => console.log("Mongo error!"));

app.use(express.json());

app.use("/test", (req, res) => {
  return res.render("home");
});

app.use("/url", urlRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
