import { DetailedHTMLProps, HTMLAttributes } from "react";
import { ITodo } from "shared/api/todoQueryApi/todoInterfaces";

export interface ICard
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  widgets?: boolean;
  task: ITodo;
}
