import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from 'app/store';
import { TodoItem } from "./TodoItem";
import { fetchTodos, selectTodoIds } from "./todosSlice"

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
