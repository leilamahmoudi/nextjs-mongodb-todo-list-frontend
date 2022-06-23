import React, { useState, useEffect } from "react";
import AddItemForm from "src/components/AddItemForm";
import RemoveItemBtn from "src/components/RemoveItemBtn";
import { useRouter } from "next/router";

import axios from "axios";
import Toolbar from "../../components/Toolbar";

const todo = ({ todoObject, items }) => {
  const router = useRouter();

  const [filteredItems, setFilteredItems] = useState(items);
  const [filter, setFilter] = useState("all");

  const updateItemAPICall = async (itemObj, itemId) => {
    const res = await axios.put(
      `https://nextjs-mongodb-todo-list-backe.herokuapp.com/api/todos/${todoObject.id}/items/${itemId}`,
      itemObj
    );
    return res.data;
  };

  useEffect(() => {
    changeFilter(filter);
  }, [items]);

  const toggleIsDone = async (item) => {
    const newItem = {
      task: item.task,
      description: item.description,
      isDone: !item.isDone,
    };

    await updateItemAPICall(newItem, item._id);
    refreshData();
  };

  const changeFilter = (filter) => {
    setFilter(filter);
    if (filter == "all") {
      setFilteredItems(items);
    } else {
      const filterConditions = filter == "done" ? true : false;
      setFilteredItems(
        items.filter((item) => {
          return item.isDone === filterConditions;
        })
      );
    }
  };

  const refreshData = () => {
    router.replace(router.asPath);
  };

  return (
    <div className="page-container">
      <Toolbar />
      <section className="todo__list">
        <h2 className="todo__list-title">{todoObject.title}</h2>
        <AddItemForm todoId={todoObject.id} />
        <select
          className="todo__list-filter"
          value={filter}
          onChange={(e) => {
            changeFilter(e.target.value);
          }}
        >
          <option value="all" className="todo__list-filter-all">
            Filter: All
          </option>
          <option value="done">Done Items</option>
          <option value="not-done">Not Done Items</option>
        </select>
        <div className="list--container-item">
          {filteredItems.map((item, index) => (
            <ul className="list--container">
              <li
                key={index}
                className="list__todo-item"
                onClick={() => {
                  toggleIsDone(item);
                }}
              >
                <p className="list__title"> {item.task}</p>
                <p className="list__description">{item.description}</p>
                <div className="list__toggle">
                  {item.isDone ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path d="M304 48C304 74.51 282.5 96 256 96C229.5 96 208 74.51 208 48C208 21.49 229.5 0 256 0C282.5 0 304 21.49 304 48zM304 464C304 490.5 282.5 512 256 512C229.5 512 208 490.5 208 464C208 437.5 229.5 416 256 416C282.5 416 304 437.5 304 464zM0 256C0 229.5 21.49 208 48 208C74.51 208 96 229.5 96 256C96 282.5 74.51 304 48 304C21.49 304 0 282.5 0 256zM512 256C512 282.5 490.5 304 464 304C437.5 304 416 282.5 416 256C416 229.5 437.5 208 464 208C490.5 208 512 229.5 512 256zM74.98 437C56.23 418.3 56.23 387.9 74.98 369.1C93.73 350.4 124.1 350.4 142.9 369.1C161.6 387.9 161.6 418.3 142.9 437C124.1 455.8 93.73 455.8 74.98 437V437zM142.9 142.9C124.1 161.6 93.73 161.6 74.98 142.9C56.24 124.1 56.24 93.73 74.98 74.98C93.73 56.23 124.1 56.23 142.9 74.98C161.6 93.73 161.6 124.1 142.9 142.9zM369.1 369.1C387.9 350.4 418.3 350.4 437 369.1C455.8 387.9 455.8 418.3 437 437C418.3 455.8 387.9 455.8 369.1 437C350.4 418.3 350.4 387.9 369.1 369.1V369.1z" />
                    </svg>
                  )}
                </div>
                <RemoveItemBtn todoId={todoObject.id} itemId={item._id} />
              </li>
            </ul>
          ))}
        </div>
      </section>
    </div>
  );
};

export const getServerSideProps = async (pageContext) => {
  let todoId = pageContext.query.todoId;
  const apiResponseTodo = await fetch(
    `https://nextjs-mongodb-todo-list-backe.herokuapp.com/api/todos/${todoId}`
  );
  const apiJsonTodo = await apiResponseTodo.json();
  const todoObject = apiJsonTodo;
  const apiResponse = await fetch(
    `https://nextjs-mongodb-todo-list-backe.herokuapp.com/api/todos/${todoId}/items`
  );
  const apiJson = await apiResponse.json();
  const items = apiJson;
  return {
    props: {
      todoObject,
      items,
    },
  };
};

export default todo;
