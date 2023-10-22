import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ICard
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode;
  title: string;
}
