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

class App extends Component {
  state = {
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
    tabname: "Todo's 1"
  };
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
    console.log(this.state.plan[this.state.activeTab]);
    console.log(this.state.activeTab);
    const todos = this.state.plan[this.state.activeTab].filter(todo => {
      return todo.id != id;
    });
    // let newplan = Object.assign({}, this.state.plan);
    // newplan[this.state.activeTab] = todos;
    // this.setState({
    //   plan: newplan
    // });
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
              className={classnames({ active: this.state.activeTab === 1 })}
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
              className={classnames({ active: this.state.activeTab === 2 })}
              onClick={() => {
                this.toggle(2);
              }}
            >
              Todo's 2
            </NavLink>
          </NavItem>
        </Nav>
        <h1 className="center blue-text"> {this.state.tabname}</h1>
        <Todos
          todos={this.state.plan[this.state.activeTab]}
          deleteTodo={this.deleteTodo}
        />
        <AddTodo addTodo={this.addTodo} />
      </div>
    );
  }
}

export default App;
