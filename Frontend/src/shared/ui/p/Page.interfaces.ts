import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface IP
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  size: "12px" | "14px" | "16px" | "40px";
  children: React.ReactNode;
  color: "black" | "gray" | "white";
  weight: "400" | "500" | "600" | "700";
}
