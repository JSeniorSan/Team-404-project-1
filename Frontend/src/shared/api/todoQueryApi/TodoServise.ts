import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ITodo } from "./todoInterfaces";

export interface ITodoPost {
  title: string;
  description: string | null;
}

export interface IAuthNewUser {
  username: string;
  password: string;
  email: string;
}

export interface IResponseAuth {
  is_active: boolean;
  is_superuser: boolean;
  is_verified: boolean;
  id: string;
  email: string;
  username: string;
}

export interface IErrorAuth {
  detail: string;
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
    registrationUser: build.mutation<IResponseAuth, IAuthNewUser>({
      query: (user) => ({
        url: "/auth/register",
        method: "POST",
        body: user,
      }),
    }),
  }),
});
