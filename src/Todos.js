import React from "react";
import { isTemplateElement } from "@babel/types";

const Todos = ({ todos, deleteTodo }) => {
  const todoList = todos.length ? (
    todos.map(todo => {
      return (
        <div className="collection-item" key={todo.id}>
          <span
            onClick={() => {
              deleteTodo(todo.id);
            }}
          >
            {todo.content}
          </span>
        </div>
      );
    })
  ) : (
    <p className="center"> You have no Todos left</p>
  );
  return <div className="todos collection">{todoList}</div>;
};

export default Todos;
