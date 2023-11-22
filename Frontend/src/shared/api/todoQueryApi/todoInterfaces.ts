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
