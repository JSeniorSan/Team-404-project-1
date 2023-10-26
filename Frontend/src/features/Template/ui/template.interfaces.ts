import { DetailedHTMLProps, HTMLAttributes } from "react";
export interface ITemplate
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode;
}
