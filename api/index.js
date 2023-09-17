import express from "express";
import { get_token } from "./coingecko.js";

const app = express();
app.disable("x-powered-by");
const port = +process.env["PORT"] || 3000;

app.get("/", (req, res) => {
  res.status(200).end("Hello World!");
});

app.get("/api/v2", async (req, res) => {
  const { name } = req.query;
  try {
    if (!name) {
      return res
        .status(400)
        .json({ status: 0, message: "Token name is missing" });
    }
    const pullData = await get_token(name);
    if (pullData != null) {
      return res.status(200).json(pullData);
    } else {
      return res
        .status(404)
        .json({ status: 0, message: "Unable to fetch data" });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ status: 0, message: "Server error" });
  }
});

app.get("/api/:name", async (req, res) => {
  const { name } = req.params;
  try {
    if (!name) return res.json({ status: 0, message: "Token name is missing" });
    const pullData = await get_token(name);
    if (pullData != null) {
      return res.status(200).json(pullData);
    } else {
      return res
        .status(404)
        .json({ status: 0, message: "Unable to fetch data" });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ status: 0, message: "Server error" });
  }
});

app.use((req, res) => {
  res.status(404).json({ status: 0, message: "Route not found" });
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
