import { DetailedHTMLProps, HTMLAttributes } from "react";
export interface ITodoTask
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  id?: string;
}

export interface IForm {
  title: string;
  description: string;
}
