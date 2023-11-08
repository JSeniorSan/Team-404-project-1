import React from "react";
import cn from "classnames";
import "./index.scss";
import { IP } from "./Page.interfaces";

const Page: React.FC<IP> = ({ size, color, weight, children, ...props }) => {
  return (
    <div
      className={cn("page", {
        ["black"]: color === "black",
        ["gray"]: color === "gray",
        ["white"]: color === "white",
        ["s"]: size === "12px",
        ["m"]: size === "14px",
        ["l"]: size === "16px",
        ["title"]: size === "40px",
        ["norm"]: weight === "400",
        ["medium"]: weight === "500",
        ["semi"]: weight === "600",
        ["bold"]: weight === "700",
      })}
      {...props}
    >
      {children}
    </div>
  );
};

export default Page;
