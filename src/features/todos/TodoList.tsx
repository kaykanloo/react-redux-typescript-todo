import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from '../../app/store';
import { Todo, fetchTodos, selectTodoById, selectTodoIds, todoDeleted, todoUpdated } from "./todosSlice"
import styles from './todos.module.css';


type TodoItemProps = {
    todoId: string
}

export const TodoItem = ({ todoId }: TodoItemProps) => {
    const dispatch = useDispatch();
    const todoData = useSelector<RootState>((state) => selectTodoById(state, todoId)) as Todo;

    const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(
            todoUpdated({ id: todoId, completed: event.currentTarget.checked })
        )
    };

    const handleRemove = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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

export const TodosList = () => {
    const dispatch = useDispatch();
    const todoIds = useSelector(selectTodoIds);
    const todosStatus = useSelector<RootState>((state) => state.todos.status) as string;

    useEffect(() => {
        if (todosStatus === "idle") {
            dispatch(fetchTodos());
        }
    }, [todosStatus, dispatch]);

    return (
        <>
            {todoIds.map((todoId) => (
                <TodoItem key={todoId} todoId={todoId as string} />
            ))}
        </>
    );
};
