import { DetailedHTMLProps, HTMLAttributes } from "react";
export interface ITodoTask
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  id?: string;
}

export interface IFormData {
  title: string;
  description: string;
  type: "withDescription" | "simpleForm";
}
