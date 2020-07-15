import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

//create child Todo component that is only used by TodoList
const Todo = (props) => (
  <tr>
    <td className={props.todo.todo_completed ? "completed" : ""}>
      {props.todo.todo_description}
    </td>
    <td className={props.todo.todo_completed ? "completed" : ""}>
      {props.todo.todo_responsible}
    </td>
    <td className={props.todo.todo_completed ? "completed" : ""}>
      {props.todo.todo_priority}
    </td>
    <td>
      <Link to={"/edit/" + props.todo._id}>Edit</Link>
    </td>
  </tr>
);
export default class TodosList extends Component {
  constructor(props) {
    super(props);

    //set todos to an empty array property
    this.state = {
      todos: [],
    };
  }

  //after component mounts make a GET request for list of todos
  componentDidMount() {
    axios
      .get("http://localhost:4000/todos")
      .then((res) =>
        this.setState({
          todos: res.data,
        })
      )
      .catch((err) => console.log(err));
  }

  //once updated GET the request again for updated Todos
  componentDidUpdate() {
    axios
      .get("http://localhost:4000/todos")
      .then((res) =>
        this.setState({
          todos: res.data,
        })
      )
      .catch((err) => console.log(err));
  }

  //implement todoList method
  todoList() {
    return this.state.todos.map(function (todo, index) {
      return <Todo todo={todo} key={index} />;
    });
  }

  render() {
    return (
      <div>
        <h3>Todos List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Description</th>
              <th>Responsible</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.todoList()}</tbody>
        </table>
      </div>
    );
  }
}
