export interface ITodo {
  id: number;
  title: string;
  description: string;
  status: boolean;
  creaed_at: Date;
}

export interface IPost {
  data: ITodo[];
}
