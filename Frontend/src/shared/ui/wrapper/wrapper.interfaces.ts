import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface IWrapper
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode;
}
