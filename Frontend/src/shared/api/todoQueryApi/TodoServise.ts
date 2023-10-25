import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ITodo } from "../todo/todoInterfaces";

export interface ITodoPost {
  title: string;
  description: null;
}
const URL = "http://127.0.0.1:8000";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  tagTypes: ["Post", "Delete"],
  endpoints: (build) => ({
    fetchAllTodos: build.query<ITodo[], string>({
      query: () => ({
        url: "/todo",
      }),
      providesTags: () => ["Post", "Delete"],
    }),
    createTodo: build.mutation<ITodo, ITodoPost>({
      query: (obj) => ({
        url: "/todo",
        method: "POST",
        body: obj,
      }),
      invalidatesTags: ["Post"],
    }),
    removeTodo: build.mutation<ITodo, number>({
      query: (id) => ({
        url: `/todo/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Delete"],
    }),
  }),
});
