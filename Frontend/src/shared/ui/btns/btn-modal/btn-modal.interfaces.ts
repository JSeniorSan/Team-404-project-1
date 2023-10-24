import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface IBtnModal
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  type: "default" | "transparent";
  title: string;
}
