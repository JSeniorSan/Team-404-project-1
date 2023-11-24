import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IAuthNewUser,
  INewWorkspacePost,
  IPanel,
  IPanelData,
  IResponseAuth,
  ITaskData,
  ITodo,
  IWorkspaceData,
} from "./todoInterfaces";
import { IWorkspace } from "../user/UserSlice";

const URL = "http://127.0.0.1:8000";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: URL, credentials: "include" }),

  tagTypes: [
    "Post",
    "Delete",
    "NewWorkspace",
    "NewTask",
    "NewPanel",
    "DeletePanel",
    "Trigger",
  ],
  endpoints: (build) => ({
    fetchAllTask: build.query<ITodo[], string>({
      query: () => ({
        url: "/task",
      }),
      providesTags: () => ["Post", "Delete"],
    }),
    createTask: build.mutation<ITodo, ITaskData>({
      query: (obj) => ({
        url: `/task/${obj.id}`,
        method: "POST",
        body: obj.infoData,
      }),
      invalidatesTags: ["NewTask"],
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
    deletePanel: build.mutation<IPanel, number>({
      query: (id) => ({
        url: `/panel/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DeletePanel"],
    }),
    removeTask: build.mutation<ITodo, number>({
      query: (id) => ({
        url: `/task/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Delete"],
    }),
    deleteWorkspace: build.mutation<IWorkspaceData, number>({
      query: (id) => ({
        url: `/workspace/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["NewWorkspace", "Trigger"],
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
      providesTags: () => [
        "NewTask",
        "NewPanel",
        "Delete",
        "DeletePanel",
        "Trigger",
      ],
    }),
    newPanel: build.mutation<IPanel, IPanelData>({
      query: (data) => ({
        url: `/panel/${data.id}`,
        method: "POST",
        body: data.titleData,
      }),
      invalidatesTags: ["NewPanel"],
    }),

    getOneTask: build.query<ITodo, number>({
      query: (id) => ({
        url: `/task/${id}`,
      }),
    }),
    changeTask: build.mutation<ITodo, ITaskData>({
      query: (data) => ({
        url: `/task/${data.id}`,
        method: "PUT",
        body: data.infoData,
      }),
      invalidatesTags: ["NewTask"],
    }),
  }),
});
