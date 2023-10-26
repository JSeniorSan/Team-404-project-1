import { DetailedHTMLProps, HTMLAttributes } from "react";
export interface ITodoTask
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export interface IForm {
  title: string;
  description: string;
}
