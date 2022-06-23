import React from "react";
import AddTodoForm from "../components/AddTodoForm";
import Toolbar from "../components/Toolbar";
import TodoList from "../components/TodoList";

export interface Todo {
  id: string;
  title: string;
  description: string;
  isDone: boolean;
}

const Todos: any = ({ todos }) => {
  return (
    <div className="page-container">
      <Toolbar />
      <section className="todo__list">
        <h2 className="todo__list-title">What do you need to do today?</h2>
        <AddTodoForm />
        <ul id="todoList" className="list--container">
          <TodoList todos={todos} />
        </ul>
      </section>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:8000/api/todos`);
  const data = await res.json();
  return { props: { todos: data } };
}

export default Todos;
