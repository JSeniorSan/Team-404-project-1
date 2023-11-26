import TodosMode from "shared/ui/todosMode/TodosMode";
import Home from "shared/asset/home-2.svg?react";
import Tasks from "shared/asset/tasks.svg?react";
import Cup from "shared/asset/cup.svg?react";
import Members from "shared/asset/profile-2user.svg?react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "shared/api/redux-hooks";
import { switchWidget } from "shared/api/view/ViewSlice";

const NavElements = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate("/dashboard/home");
    dispatch(switchWidget(""));
  };
  return (
    <div className="navig">
      <TodosMode title="Home" onClick={handleHomeClick}>
        <Home />
      </TodosMode>
      <TodosMode title="My Tasks">
        <Tasks />
      </TodosMode>
      <TodosMode title="Goals">
        <Cup />
      </TodosMode>
      <TodosMode title="Members">
        <Members />
      </TodosMode>
    </div>
  );
};

export default NavElements;
