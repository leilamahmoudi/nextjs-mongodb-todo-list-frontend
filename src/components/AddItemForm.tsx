import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const AddItemForm = ({ todoId }) => {
  const router = useRouter();
  const [newTask, setNewTask] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handelNewTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
    setErrorMessage("");
  };

  const handelNewDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewDescription(event.target.value);
  };

  const addItemAPICall = async (itemObj) => {
    const res = await axios.post(
      `https://nextjs-mongodb-todo-list-backe.herokuapp.com/api/todos/${todoId}/items`,
      itemObj
    );
    return res.data;
  };

  const addTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newTask === "") {
      setErrorMessage("Title should not be blank!");
      return;
    }

    const newItem = {
      task: newTask,
      description: newDescription,
    };

    await addItemAPICall(newItem);

    setNewDescription("");
    setNewTask("");
    refreshData();
  };

  const refreshData = () => {
    router.replace(router.asPath);
  };
  return (
    <div>
      <form id="form" className="form__container" onSubmit={addTodo}>
        {errorMessage && (
          <label className="form__label-error-hidden" id="errorLabel">
            {errorMessage}
          </label>
        )}
        <input
          type="text"
          className="form__input-title"
          id="txtTodoItemToAdd"
          placeholder="Add new item"
          value={newTask}
          onChange={handelNewTask}
        />
        <input
          type="text"
          className="form__input-description"
          id="inputDescription"
          placeholder="description"
          value={newDescription}
          onChange={handelNewDescription}
          required
        />
        <input
          type="submit"
          className="form__input-add"
          value="Add item"
          id="btnAddIten"
        />
      </form>
    </div>
  );
};

export default AddItemForm;
