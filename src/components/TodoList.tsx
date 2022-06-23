import { useRouter } from "next/router";
import React from "react";
import RemoveTodoBtn from "src/components/RemoveTodoBtn";
import { Todo } from "src/pages/todos";

interface Props {
  todo: Todo;
}

const TodoList = ({ todos }) => {
  const router = useRouter();
  return (
    <div>
      {todos.map((todo, index) => (
        <li
          key={index}
          onClick={() => {
            router.push(`/todos/${todo._id}`);
          }}
          className="list__todo-item"
        >
          <p className="list__title">{todo.title}</p>
          <p className="list__description">{todo.description}</p>
          <RemoveTodoBtn todo={todo} />
        </li>
      ))}
    </div>
  );
};

export default TodoList;
