import { useLastPathname } from "shared/helpers/location/Location";
import cn from "classnames";
import React from "react";
const PanelsFormatContainer = ({ children }: { children: React.ReactNode }) => {
  const pathname = useLastPathname();
  return (
    <div
      className={cn({
        ["listPanelsFormat"]: pathname === "list",
        ["boardPanelsFormat"]: pathname === "board",
      })}
    >
      {children}
    </div>
  );
};

export default PanelsFormatContainer;
