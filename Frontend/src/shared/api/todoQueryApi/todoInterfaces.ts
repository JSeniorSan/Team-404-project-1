export interface ITodo {
  id: number;
  title: string;
  description: string;
  updated_at: Date;
  creaed_at: Date;
  is_completed: boolean;
  user_id: string;
}

export interface IPost {
  data: ITodo[];
}
