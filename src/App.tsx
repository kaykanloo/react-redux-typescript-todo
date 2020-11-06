import React from 'react';
import './App.css';

import { TodoInput } from "./features/todos/TodoInput"
import { TodosList } from "./features/todos/TodoList"

function App() {
  return (
    <div className="App">
      <TodoInput />
      <TodosList />
    </div>
  );
}

export default App;
