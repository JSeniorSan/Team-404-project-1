import TodosMode from "shared/ui/todosMode/TodosMode";
import cn from "classnames";
import { useSelector } from "react-redux";
import { selectView } from "shared/api/view/viewSliceSelector";
import { useAppDispatch } from "shared/api/redux-hooks";
import { useNavigate } from "react-router-dom";
import { switchWidget } from "shared/api/view/ViewSlice";
import ListLogo from "shared/asset/fatrows.svg?react";
import BoardLogo from "shared/asset/kanban.svg?react";
import Calendar from "shared/asset/calendar.svg?react";

const LeftHeaderItems = () => {
  const viewState = useSelector(selectView);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleListClick = () => {
    dispatch(switchWidget("List"));
    navigate("/dashboard/list");
  };

  const handleBoardClick = () => {
    dispatch(switchWidget("Board"));
    navigate("/dashboard/kanban");
  };

  return (
    <div className="flex gap-4 items-center">
      <TodosMode
        title="List"
        className={cn({
          ["activeBlue"]: viewState === "List",
        })}
        onClick={handleListClick}
      >
        <ListLogo />
      </TodosMode>
      <TodosMode
        title="Board"
        className={cn({ ["activeBlue"]: viewState === "Board" })}
        onClick={handleBoardClick}
      >
        <BoardLogo className="fill-gray-50" />
      </TodosMode>
      <TodosMode title="Calendar">
        <Calendar />
      </TodosMode>
    </div>
  );
};

export default LeftHeaderItems;
