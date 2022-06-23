import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const AddTodoForm = () => {
  const router = useRouter();

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handelNewTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
    setErrorMessage("");
  };

  const handelNewDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewDescription(event.target.value);
  };

  const addTodoAPICall = async (todoObj) => {
    const res = await axios.post("http://localhost:8000/api/todos", todoObj);
    return res.data;
  };

  const addTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newTitle === "") {
      setErrorMessage("Title should not be blank!");
      return;
    }

    const newTodo = {
      title: newTitle,
      description: newDescription,
    };

    await addTodoAPICall(newTodo);

    setNewDescription("");
    setNewTitle("");
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
          placeholder="Add new task"
          value={newTitle}
          onChange={handelNewTitle}
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
          value="Add todo"
          id="btnAddTodo"
        />
      </form>
    </div>
  );
};

export default AddTodoForm;
