import ListLogo from "shared/asset/fatrows.svg?react";
import BoardLogo from "shared/asset/kanban.svg?react";
import Calendar from "shared/asset/calendar.svg?react";

export const data = [
  {
    path: "list",
    svg: <ListLogo />,
    title: "List",
  },
  {
    path: "board",
    svg: <BoardLogo />,
    title: "Board",
  },
  {
    path: "calendar",
    svg: <Calendar />,
    title: "Calendar",
  },
];
