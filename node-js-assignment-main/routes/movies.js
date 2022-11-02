import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
uuidv4();
const router = express.Router();

mongoose.connect(
  "mongodb+srv://test:test@movies.u6s8y.mongodb.net/?retryWrites=true&w=majority"
);

mongoose.connection.on("error", (err) => {
  console.log("connection failed");
});

mongoose.connection.on("connected", (connected) => {
  console.log("connected with database");
});

var movies = [
  //   {
  //     name: "Harry Potter and the Order of the Phoenix",
  //     img: "https://bit.ly/2IcnSwz",
  //     summary:
  //       "Harry Potter and Dumbledore's warning about the return of Lord Voldemort is not heeded by the wizard authorities who, in turn, look to undermine Dumbledore's authority at Hogwarts and discredit Harry.",
  //   },
  //   {
  //     name: "The Lord of the Rings: The Fellowship of the Ring",
  //     img: "https://bit.ly/2tC1Lcg",
  //     summary:
  //       "A young hobbit, Frodo, who has found the One Ring that belongs to the Dark Lord Sauron, begins his journey with eight companions to Mount Doom, the only place where it can be destroyed.",
  //   },
];

router.get("/", (req, res) => {
  console.log(movies);
  res.send(movies);
});

router.post("/", (req, res) => {
  const movie = req.body;
  movies.push({ ...movie, id: uuidv4() });
  res.send(`Movie with the name ${movie.name} added to the database`);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const foundMovie = movies.find((movie) => movie.id == id);
  res.send(foundMovie);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  movies = movies.filter((movie) => movie.id !== id);

  res.send(`Movie with the id ${id} deleted from the database`);
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { name, img, summary } = req.body;
  const movie = movies.find((movie) => movie.id == id);
  if (name) movie.name = name;

  if (img) movie.img = img;

  if (summary) movie.summary = summary;

  res.send(`Movie with the id ${id} has been updated`);
});

export default router;
