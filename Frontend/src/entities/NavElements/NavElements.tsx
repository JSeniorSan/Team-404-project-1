import TodosMode from "shared/ui/todosMode/TodosMode";
import Home from "shared/asset/home-2.svg?react";
import Tasks from "shared/asset/tasks.svg?react";
import Cup from "shared/asset/cup.svg?react";
import Members from "shared/asset/profile-2user.svg?react";

const NavElements = () => {
  const arr = [
    { title: "Home", svgPic: <Home /> },
    { title: "My Tasks", svgPic: <Tasks /> },
    { title: "Goals", svgPic: <Cup /> },
    { title: "Members", svgPic: <Members /> },
  ];
  return (
    <div className="navig">
      {arr.map((elem) => {
        return (
          <TodosMode title={elem.title} key={elem.title}>
            {elem.svgPic}
          </TodosMode>
        );
      })}
    </div>
  );
};

export default NavElements;
