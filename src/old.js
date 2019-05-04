import React, { Component } from "react";
import Todos from "./Todos";
import AddTodo from "./AddTodo";
// import update from "immutability-helper";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col
} from "reactstrap";
import classnames from "classnames";
import { updateExpression } from "@babel/types";

class Bit extends Component {
  constructor(props) {
    super(props);
    // console.log(props);
    this.state = {
      content: props[0],
      id: props[1]
    };
  }
}

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bits: {},
      numBits: 0,
      taskName: props[0]
    };
  }
  addBit(bit) {
    const newBits = { ...this.bits };
    newBits[this.numBits + 1] = bit;
    this.setState({
      bits: newBits,
      numBits: this.numBits + 1
    });
  }
  delBit(bit) {
    const bitid = bit.state.id;
    const newBits = this.bits.filter(curBit => {
      return curBit.state.id != bitid;
    });
    this.setState({
      bits: newBits,
      numBits: this.newBits - 1
    });
  }
}

class Plan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: {},
      taskNames: [],
      numTasks: 0,
      currentTask: ""
    };
  }
  componentDidMount() {
    const bit1 = new Bit(["Design your plan", 1]);
    const task1 = new Task(["Task 1"]);
    task1.addBit(bit1);
    this.addTask(task1);
  }
  check() {
    console.log(this.state.taskNames);
    console.log(this.state.tasks);
  }
  addTask(task) {
    const tname = task.state.taskName;
    const newTasks = { ...this.tasks };
    newTasks[tname] = task;
    var names;
    if (this.state.numTasks == 0) {
      names = [tname];
    } else {
      names = [this.taskNames, tname];
    }
    // const newTaskNames = [this.taskNames, tname];
    this.setState({
      tasks: newTasks,
      taskNames: names,
      numTasks: this.numTasks + 1
    });
  }
  delTask(taskName) {
    const t = new Task(taskName);
    const newTasks = { ...this.tasks, t };
    const newTaskNames = [...this.taskNames, taskName];
    this.setState({
      tasks: newTasks,
      taskNames: newTaskNames,
      numTasks: this.numTasks + 1
    });
  }
  toggle(tab) {
    if (this.state.currentTask !== tab) {
      this.setState({
        currentTask: tab
      });
    }
  }
  createTabs = () => {
    let table = [];
    for (let i = 0; i < this.state.numTasks; i++) {
      const t = (
        <NavItem>
          {" "}
          <NavLink
            // className={classnames({ active: this.state.activeTab === 1 })}
            onClick={() => {
              this.toggle(this.state.taskNames[i]);
            }}
          >
            {this.state.taskNames[i]}
          </NavLink>
        </NavItem>
      );
      table.push(t);
    }
    return <Nav tabs> {table} </Nav>;
  };
  render() {
    this.check();
    return (
      <div className="todo-app container">
        {this.createTabs()}
        <h1 className="blue-text"> {this.state.tabname}</h1>
        {/* <Todos
          className="bottom"
          todos={this.state.plan[this.state.activeTab]}
          deleteTodo={this.deleteTodo}
        />
        <AddTodo addTodo={this.addTodo} /> */}
      </div>
    );
  }
}

export default Plan;
