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
    let b = new Bit([bit, Math.random()]);
    const newBits = { ...this.bits, b };
    this.setState({
      bits: newBits,
      numBits: this.numBits + 1
    });
  }
  delBit(bit) {
    const bitid = bit.id;
    const newBits = this.bits.filter(curBit => {
      return curBit.id != bitid;
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
      currentTask: " "
    };
  }

  addTask(taskName) {
    let t = new Task(taskName);
    const newTasks = { ...this.tasks, t };
    const newTaskNames = [...this.taskNames, taskName];
    this.setState({
      tasks: newTasks,
      taskNames: newTaskNames,
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
    return (
      <div className="todo-app container">
        {this.createTabs()}
        <h1 className="blue-text"> {this.state.tabname}</h1>
        <Todos
          className="bottom"
          todos={this.state.plan[this.state.activeTab]}
          deleteTodo={this.deleteTodo}
        />
        <AddTodo addTodo={this.addTodo} />
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    let t = new Plan(1);
    this.state = {
      plan: {
        t1: [
          { id: 1, content: "Buy some milk!" },
          { id: 2, content: "Work more..." }
        ],
        t2: [
          { id: 1, content: "GO TO STORE!" },
          { id: 2, content: "PLAY GAMES..." }
        ]
      },
      currentTodo: null,
      activeTab: "t1",
      tabid: "todo1",
      tabname: "Todo's 1",
      numtabs: 1,
      test: t
    };
  }
  toggle(tab) {
    var tabstr = "Todo's ";
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: "t".concat(tab.toString()),
        tabname: tabstr.concat(tab.toString())
      });
    }
  }
  deleteTodo = id => {
    // console.log(this.state.plan[this.state.activeTab]);
    // console.log(this.state.activeTab);
    const todos = this.state.plan[this.state.activeTab].filter(todo => {
      return todo.id != id;
    });
    const newplan = { ...this.state.plan };
    newplan[this.state.activeTab] = todos;
    this.setState({
      plan: newplan
    });
  };

  addTodo = todo => {
    todo.id = Math.random();
    const newtodo = [...this.state.plan[this.state.activeTab], todo];
    const newplan = { ...this.state.plan };
    newplan[this.state.activeTab] = newtodo;

    this.setState({
      plan: newplan
    });
  };

  render() {
    return (
      <div className="todo-app container">
        <Nav tabs>
          <NavItem>
            {" "}
            <NavLink
              // className={classnames({ active: this.state.activeTab === 0 })}
              onClick={() => {
                this.toggle(1);
              }}
            >
              Todo's 1
            </NavLink>
          </NavItem>
          <NavItem>
            {" "}
            <NavLink
              // className={classnames({ active: this.state.activeTab === 0 })}
              onClick={() => {
                this.toggle(2);
              }}
            >
              Todo's 2
            </NavLink>
          </NavItem>
        </Nav>
        <h1 className="blue-text"> {this.state.tabname}</h1>
        <Todos
          className="bottom"
          todos={this.state.plan[this.state.activeTab]}
          deleteTodo={this.deleteTodo}
        />
        <AddTodo addTodo={this.addTodo} />
      </div>
    );
  }
}

export default App;
