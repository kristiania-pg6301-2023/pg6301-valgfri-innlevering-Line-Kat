import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const TASKS = [];

app.get("/api/tasks", (req, res) => {
  res.json(TASKS);
});

app.post("/api/tasks", (req, res) => {
  const task = req.body;
  TASKS.push(task);

  res.send();
});

app.use(express.static("../client/dist"));
app.listen(process.env.PORT || 3000);
