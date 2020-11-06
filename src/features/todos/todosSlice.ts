import { v4 as uuidv4 } from "uuid";
import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import { RootState } from '../../app/store';

export interface Todo {
  id: string,
  title?: string,
  completed?: boolean
}

const todosAdapter = createEntityAdapter<Todo>();

const initialState = todosAdapter.getInitialState({
  status: "idle" as string,
  error: null as unknown
});

// Export the customized selectors for this adapter using `getSelectors`
export const {
  selectAll: selectAllTodos,
  selectById: selectTodoById,
  selectIds: selectTodoIds
  // Pass in a selector that returns the posts slice of state
} = todosAdapter.getSelectors<RootState>((state) => state.todos);

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=3"
  );
  return (await response.json()) as Todo[];
});

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    todoUpdated: todosAdapter.upsertOne,

    todoDeleted(state, action: PayloadAction<Todo>) {
      todosAdapter.removeOne(state, action.payload.id);
    },

    todoAdded: {
      reducer(state, action: PayloadAction<Todo>) {
        todosAdapter.upsertOne(state, action.payload);
      },
      prepare(title: string) {
        return {
          payload: {
            id: uuidv4(),
            title,
            completed: false
          }
        };
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchTodos.pending, (state, action) => {
      state.status = "loading";
    })
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.status = "succeeded";
      todosAdapter.upsertMany(state, action.payload);
    })
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    })
  }
});

export const { todoAdded, todoDeleted, todoUpdated } = todosSlice.actions;
export default todosSlice.reducer;
