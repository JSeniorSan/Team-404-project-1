import { DetailedHTMLProps, HTMLAttributes } from "react";
export interface ITodoTask
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  columnId: number;
}

export interface IFormData {
  title: string;
  description: string;
  type: "withDescription" | "simpleForm";
}
