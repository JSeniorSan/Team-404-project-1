import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface IButtonDone
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  description: string;
  color: "yellow" | "green" | "red" | "default";
}
