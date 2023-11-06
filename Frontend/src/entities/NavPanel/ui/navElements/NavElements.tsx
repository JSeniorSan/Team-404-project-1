import TodosMode from "../../../../shared/ui/todosModeContainer/TodosMode";

import Home from "../../../../shared/asset/home-2.svg?react";
import Tasks from "../../../../shared/asset/tasks.svg?react";
import Cup from "../../../../shared/asset/cup.svg?react";
import Members from "../../../../shared/asset/profile-2user.svg?react";
import { useNavigate } from "react-router-dom";

const NavElements = () => {
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate("/dashboard/home");
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
