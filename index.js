import express from "express";
import { connectDb } from "./connect.js";
import urlRoutes from "./routes/url.js";
import staticRoutes from "./routes/statisRouter.js";
import path from "path";

const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDb("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("Mongo connected."))
  .catch((err) => console.log("Mongo error!"));

app.use("/", staticRoutes);
app.use("/url", urlRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
