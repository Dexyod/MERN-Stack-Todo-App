//import mongoose and use the Schema class
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Todo = new Schema({
  todo_description: {
    type: String,
  },
  todo_responsible: {
    type: String,
  },
  todo_priority: {
    type: String,
  },
  todo_completed: {
    type: Boolean,
  },
});

//export module using mongoose
module.exports = mongoose.model("Todo", Todo, "Todo");
