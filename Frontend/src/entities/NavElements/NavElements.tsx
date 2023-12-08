import TodosMode from "shared/ui/todosMode/TodosMode";
import Home from "shared/asset/home-2.svg?react";
import Tasks from "shared/asset/tasks.svg?react";
import Cup from "shared/asset/cup.svg?react";
import Members from "shared/asset/profile-2user.svg?react";
// import { useEffect } from "react";
import { useAppDispatch } from "shared/hooks/redux-hooks";
import { switchWidget } from "shared/api/view/ViewSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectView } from "shared/api/view/viewSliceSelector";
import cn from "classnames";

const NavElements = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const viewState = useSelector(selectView);

  const arr = [
    { title: "Home", svgPic: <Home />, path: "home" },
    { title: "My Tasks", svgPic: <Tasks />, path: "myTask" },
    { title: "Goals", svgPic: <Cup />, path: "goals" },
    { title: "Members", svgPic: <Members />, path: "members" },
  ];

  function onNavClick(path: string) {
    dispatch(switchWidget(path));
    navigate(`/dashboard/${path}`);
  }
  return (
    <div className="navig">
      {arr.map((elem) => {
        return (
          <TodosMode
            title={elem.title}
            key={elem.title}
            className={cn({
              ["activeBlue"]: viewState === elem.path,
            })}
            onClick={() => onNavClick(elem.path)}
          >
            {elem.svgPic}
          </TodosMode>
        );
      })}
    </div>
  );
};

export default NavElements;
