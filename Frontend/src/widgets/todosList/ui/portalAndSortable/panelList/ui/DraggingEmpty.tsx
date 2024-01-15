import React from "react";
import cn from "classnames";

export interface IDragEmpty {
  setNodeRef: (node: HTMLElement | null) => void;
  type: string;
}

const DraggingEmpty: React.FC<IDragEmpty> = ({
  setNodeRef,
  type,

  ...props
}) => {
  return (
    <div
      ref={setNodeRef}
      className={cn({
        ["border w-[250px] min-h-full h-fit opacity-90 rounded-lg mr-5 border-blue-200 flex-shrink-0 flex-grow-0 bg-slate-50"]:
          type === "board",
      })}
      {...props}
    />
  );
};

export default DraggingEmpty;
