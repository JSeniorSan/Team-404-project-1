export interface ITodo {
  id: number;
  title: string;
  description: string;
  updated_at: Date;
  created_at: Date;
  is_completed: boolean;
  panel_id: string;
}

export interface IPost {
  data: ITodo[];
}
export interface ITodoPost {
  title: string;
  description: string | null;
}

export interface ITaskData {
  infoData: ITodoPost;
  id: string | undefined;
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
  hex?: string;
}

export interface INewWorkspacePost {
  name: string | undefined;
}

export interface IPanel {
  name: string;
  id: number;
  workspace_id: number;
}

export interface IPanelTitle {
  name: string | undefined;
}

export interface IPanelData {
  id: number;
  titleData: IPanelTitle;
}
