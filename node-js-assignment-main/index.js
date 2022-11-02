import express from "express";
import bodyParser from "body-parser";

import moviesRoutes from "./routes/movies.js";
const app = express();
const PORT = 9000;

// app.use(bodyParser.urlencoded({ extends: true }));
app.use(bodyParser.json());

app.use("/movies", moviesRoutes);
app.get("/", (req, res) => {
  console.log("[Test]!");

  res.send("Hello from Homepage.");
});

app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);
