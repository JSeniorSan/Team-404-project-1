import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IAuthNewUser,
  IChangeTask,
  INewWorkspacePost,
  IPanel,
  IPanelData,
  IResponseAuth,
  ITodo,
  ITodoPost,
  IWorkspaceData,
} from "./todoInterfaces";

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
    createTask: build.mutation<ITodo, ITodoPost>({
      query: (obj) => ({
        url: `/task/${obj.panel_id}`,
        method: "POST",
        body: { title: obj.title, description: obj.description },
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
      invalidatesTags: ["NewWorkspace"],
    }),
    getAllWorkspaces: build.query<IWorkspaceData[], null>({
      query: () => ({
        url: "/workspace/",
      }),
      providesTags: () => ["NewWorkspace"],
    }),
    createNewWorkspace: build.mutation<IWorkspaceData, INewWorkspacePost>({
      query: (obj) => ({
        url: "/workspace/",
        method: "POST",
        body: obj,
      }),
      invalidatesTags: ["NewWorkspace"],
    }),
    getKanban: build.query<IWorkspaceData, number>({
      query: (id) => ({
        url: `/workspace/${id}`,
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
    changeTask: build.mutation<ITodo, IChangeTask>({
      query: (data) => ({
        url: `/task/${data.taskId}`,
        method: "PATCH",
        body: {
          title: data.title,
          description: data.description,
        },
      }),
      invalidatesTags: ["NewTask"],
    }),
    // changePanelTask: build.mutation<ITodo, ITaskData>({
    //   query: (data) => ({
    //     url: `/task/${data.id}`,
    //     method: "PATCH",
    //     body: data.infoData,
    //   }),
    //   invalidatesTags: ["NewTask"],
    // }),
  }),
});
