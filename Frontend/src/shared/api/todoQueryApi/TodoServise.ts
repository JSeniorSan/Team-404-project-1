import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ITodo } from "./todoInterfaces";
import { IWorkspace } from "../user/UserSlice";

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
  id?: string;
  email: string;
  username: string;
}

export interface IErrorAuth {
  detail: string;
}

export interface IWorkspaceData {
  name: string;
  id: number;
  user_id: string;
}

export interface INewWorkspacePost {
  name: string | undefined;
}

const URL = "http://127.0.0.1:8000";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: URL, credentials: "include" }),
  tagTypes: ["Post", "Delete", "NewWorkspace"],
  endpoints: (build) => ({
    fetchAllTask: build.query<ITodo[], string>({
      query: () => ({
        url: "/task",
      }),
      providesTags: () => ["Post", "Delete"],
    }),
    createTask: build.mutation<ITodo, ITodoPost>({
      query: (obj) => ({
        url: "/task",
        method: "POST",
        body: obj,
      }),
      invalidatesTags: ["Post"],
    }),
    removeTask: build.mutation<ITodo, number>({
      query: (id) => ({
        url: `/task/${id}`,
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
    getMe: build.query<IResponseAuth, string>({
      query: () => ({
        url: `/users/me`,
      }),
    }),
    login: build.mutation<string, string>({
      query: (login) => {
        return {
          url: "/auth/login",
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: JSON.stringify(login),
        };
      },
    }),
    logout: build.mutation<string, null>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    deleteMeById: build.mutation<string, string>({
      query: (id) => ({
        url: `/users/${id}`,
      }),
    }),
    getAllWorkspaces: build.query<IWorkspaceData[], string>({
      query: () => ({
        url: "/workspace/",
      }),
      providesTags: () => ["NewWorkspace"],
    }),
    createNewWorkspace: build.mutation<IWorkspace, INewWorkspacePost>({
      query: (obj) => ({
        url: "/workspace/",
        method: "POST",
        body: obj,
      }),
      invalidatesTags: ["NewWorkspace"],
    }),
    getKanban: build.query<IWorkspace, number>({
      query: (id) => ({
        url: `/kanban/${id}`,
      }),
    }),
  }),
});
