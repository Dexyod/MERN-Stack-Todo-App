//import Middleware dependencies (express, body-parser, mongoose, cors)
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const todoRoutes = express.Router();
const PORT = 4000;

//import Todo module Schema
let Todo = require("./todo.model");

//enable cors (cross-origin resource sharing)
app.use(cors());
//body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body
app.use(bodyParser.json());

//connect mongoose with MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/todos", {
  useNewUrlParser: true,
});

const connection = mongoose.connection;
connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

//create todo Routes using express.Router
todoRoutes.route("/").get(function (req, res) {
  //use Todo Schema imported from todo.model
  // eslint-disable-next-line
  Todo.find(function (err, todos) {
    if (err) {
      console.log(err);
    } else {
      res.json(todos);
    }
  });
});
//GET id of Todo
todoRoutes.route("/:id").get(function (req, res) {
  let id = req.params.id;
  Todo.findById(id, function (err, todo) {
    res.json(todo);
  });
});

//POST new Todo
todoRoutes.route("/add").post(function (req, res) {
  let todo = new Todo(req.body);
  todo
    .save()
    .then((todo) => {
      res.status(200).json({
        todo: "todo added successfully",
      });
    })
    .catch((err) => {
      res.status(400).send("adding new todo failed");
    });
});

//POST update Todo
todoRoutes.route("/update/:id").post(function (req, res) {
  Todo.findById(req.params.id, function (err, todo) {
    if (!todo) res.status(404).send("data is not found");
    else todo.todo_description = req.body.todo_description;
    todo.todo_responsible = req.body.todo_responsible;
    todo.todo_priority = req.body.todo_priority;
    todo.todo_completed = req.body.todo_completed;
    todo
      .save()
      .then((todo) => {
        res.json("Todo updated");
      })
      .catch((err) => {
        res.status(400).send("Update not possible");
      });
  });
});

//DELETE Todo
// todoRoutes.delete("/:id", function (req, res, next) {
//   Todo.findByIdAndDelete(req.params.id, req.body, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

app.use("/todos", todoRoutes);
app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
