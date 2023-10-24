import React from "react";
import cn from "classnames";
import "./index.scss";
import { IP } from "./Page.interfaces";
const Page: React.FC<IP> = ({ size, color, children, ...props }) => {
  return (
    <div
      className={cn("page", {
        ["white"]: color === "white",
        ["large"]: size === "large",
      })}
      {...props}
    >
      {children}
    </div>
  );
};

export default Page;
