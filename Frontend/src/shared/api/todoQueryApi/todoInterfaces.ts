export interface ITodo {
  id: number;
  title: string;
  description: string;
  updated_at: Date;
  created_at: Date;
  panel_id: number;
}

export interface IPost {
  data: ITodo[];
}
export interface ITodoPost {
  title: string;
  description: string | null;
  panel_id: number;
}

export interface IChangeTask {
  title: string;
  description: string;
  taskId: number;
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
  creator_id: string;
  hex: string;
  panels: IPanel[];
  members: IMembers[];
  panels_order: string;
}

export interface IMembers {
  id: string;
  username: string;
  email: string;
}

export interface INewWorkspacePost {
  name: string | undefined;
  hex: string;
}

export interface IPanel {
  name: string;
  id: number;
  workspace_id: number;
  tasks: ITodo[];
}

export interface IPanelTitle {
  name: string | undefined;
}

export interface IPanelData {
  id: number;
  titleData: IPanelTitle;
}
