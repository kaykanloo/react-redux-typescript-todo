import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from '../../app/store';
import { Todo, selectTodoById, todoDeleted, todoUpdated } from "./todosSlice"
import styles from './todos.module.css';

type TodoItemProps = {
    todoId: string
}

export const TodoItem = ({ todoId }: TodoItemProps) => {
    const dispatch = useDispatch();
    const todoData = useSelector<RootState>((state) => selectTodoById(state, todoId)) as Todo;

    const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(
            todoUpdated({ id: todoId, completed: event.target.checked })
        )
    };

    const handleRemove = () => {
        dispatch(todoDeleted({ id: todoId }))
    };

    return (
        <div className={styles.row}>
            <label className={styles.label}>
                <input
                    type="checkbox"
                    checked={todoData.completed}
                    onChange={handleToggle}
                />{" "}
                {todoData.title}
            </label>
            <button
                type="button"
                className={styles.removeButton}
                onClick={handleRemove}
            >
                Remove
            </button>
        </div>
    );
};

