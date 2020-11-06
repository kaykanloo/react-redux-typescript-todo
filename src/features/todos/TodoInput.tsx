import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { todoAdded } from "./todosSlice";
import styles from './todos.module.css';

export const TodoInput = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title !== "") {
      dispatch(todoAdded(title));
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label className={styles.label} htmlFor="todoTextTitle">
          Please add to-do item(s) using the input field.
        </label>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          type="text"
          id="todoTextTitle"
          value={title}
          placeholder="Todo title..."
          onChange={(event) => setTitle(event.target.value)}
        />
        <input className={styles.addButton} type="submit" value="Add" />
      </div>
    </form>
  );
};
