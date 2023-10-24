import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ITodo, ITodos } from "./todoInterfaces";
import axios from "axios";
import { IPost } from "./todoInterfaces";
const URL_GET = "http://127.0.0.1:8000/getdata";
const URL_POST = "http://127.0.0.1:8000/addtodo";
export const GetTodosAsync = createAsyncThunk<ITodo[]>(
  "@todos/getData",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(URL_GET);
      console.log(data);

      return data;
    } catch (err) {
      if (err instanceof Error) {
        return err.message;
      }
      return rejectWithValue("Error was received");
    }
  }
);

export const MakeTodo = createAsyncThunk(
  "@@todos/makeTodo",
  async (value: string) => {
    try {
      const { data } = await axios.post<IPost>(
        URL_POST,

        {
          title: value,
          description: null,
        }
      );
      console.log(data);

      return data.data;
    } catch (err) {
      if (err instanceof Error) {
        return err.message;
      }
      return "error";
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
      .addCase(GetTodosAsync.pending, (state) => {
        (state.status = "loading"), (state.errors = null);
      })
      .addCase(GetTodosAsync.rejected, (state, action) => {
        (state.status = "rejected"), (state.errors = action.payload);
      })
      .addCase(GetTodosAsync.fulfilled, (state, action) => {
        state.errors = null;
        state.status = "idle";
        state.intities = [...action.payload];
      })
      .addCase(MakeTodo.fulfilled, (state, action) => {
        state.errors = null;
        state.status = "idle";
        state.intities = [...action.payload];
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
          state.errors = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state) => {
          state.errors = "some Error";
          state.status = "rejected";
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.status = "idle";
          state.errors = null;
        }
      );
  },
});