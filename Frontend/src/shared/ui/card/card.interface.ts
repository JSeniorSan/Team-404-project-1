import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ICard
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title: string;
  elemId: number;
}
