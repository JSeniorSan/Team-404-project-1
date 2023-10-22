export interface ITodo {
  id: number;
  title: string;
  descrption: string;
  status: boolean;
  creaed_at: Date;
}

export interface ITodos {
  status: string;
  intities: ITodo[];
  errors: string | null | unknown;
}

export interface IPost {
  data: ITodo[];
}
