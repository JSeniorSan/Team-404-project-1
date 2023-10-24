import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ITodo, ITodos } from "./todoInterfaces";
import axios from "axios";
const URL = "http://127.0.0.1:8000/todo";

export const GetTodosAsync = createAsyncThunk<ITodo[]>(
  "@todos/getData",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(URL);
      return data;
    } catch (err) {
      return rejectWithValue("error");
    }
  }
);

export const MakeTodo = createAsyncThunk(
  "@@todos/makeTodo",
  async (value: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(URL, {
        title: value,
        description: null,
      });
      return data;
    } catch (err) {
      return rejectWithValue("errors");
    }
  }
);

export const DeleteTodo = createAsyncThunk(
  "@@todos/deleteTodo",

  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(URL, { data: id });
      return data;
    } catch (err) {
      return rejectWithValue("errorss");
    }
  }
);

export const ToggleTodo = createAsyncThunk(
  "@@todos/toggleTodo",
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(URL, { id: id });
      return data;
    } catch (err) {
      return rejectWithValue("errrororororor");
    }
  }
);

const initialState: ITodos = {
  status: "idle",
  intities: [],
  errors: null,
};

export const TodoSlice = createSlice({
  name: "@@todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetTodosAsync.fulfilled, (state, action) => {
        state.errors = null;
        state.status = "idle";
        state.intities = [...action.payload];
      })

      .addCase(
        MakeTodo.fulfilled,
        (state, action: PayloadAction<{ status: number }>) => {
          state.errors = null;
          state.status = "idle";
          console.log(action.payload);
        }
      )
      .addCase(
        DeleteTodo.fulfilled,
        (state, action: PayloadAction<{ status: number }>) => {
          state.errors = null;
          state.status = "idle";
          console.log(action.payload);
        }
      )
      .addCase(
        ToggleTodo.fulfilled,
        (state, action: PayloadAction<{ status: number }>) => {
          state.errors = null;
          state.status = "idle";
          console.log(action.payload);
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state) => {
          state.errors = "some Error";
          state.status = "rejected";
        }
      );
  },
});
