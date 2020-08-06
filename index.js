require("dotenv").config();

const express = require("express");
const cors = require("cors");
const server = express();
const port = process.env.PORT || 5000;
const postsRouter = require("./routers/posts-router");
server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  const message = process.env.MESSAGE;
  res.send(`<h1>Server is running </h1>`);
  res.json({message: message})
});

server.use("/api/posts", postsRouter);

server.listen(port, () => {
  console.log("\n*** Server Running on http://localhost:4000 ***\n");
});
