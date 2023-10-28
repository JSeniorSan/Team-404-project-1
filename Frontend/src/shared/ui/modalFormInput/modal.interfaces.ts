import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface IInput
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  type: string;
  placeholder: string;
}
