import Members from "shared/asset/profile-2user.svg?react";
import Home from "shared/asset/home-2.svg?react";
import Tasks from "shared/asset/tasks.svg?react";
import Cup from "shared/asset/cup.svg?react";

export const data = [
  { title: "Home", svgPic: <Home />, path: "home" },
  { title: "My Tasks", svgPic: <Tasks />, path: "myTask" },
  { title: "Goals", svgPic: <Cup />, path: "goals" },
  { title: "Members", svgPic: <Members />, path: "members" },
];
