import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "shared/api/redux-hooks";
import { addWorkspace } from "shared/api/user/UserSlice";
import { switchWidget } from "shared/api/view/ViewSlice";
import { selectView } from "shared/api/view/viewSliceSelector";
import Page from "shared/ui/p/Page";
import Dots from "shared/asset/tabler_dots.svg?react";
import cn from "classnames";
import { useEffect, useState } from "react";
import { selectWorkspaceData } from "shared/api/user/userSelectors";

export interface IWorksapce {
  id: number;
  name: string;
}

const Workspace: React.FC<IWorksapce> = ({ id, name }) => {
  const [state, setState] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const template = useSelector(selectView);
  const getId = useSelector(selectWorkspaceData);

  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  console.log(randomColor);

  useEffect(() => {
    if (getId === id) {
      setState(true);
    } else {
      setState(false);
    }
  }, [setState, getId, id]);

  const handleClickToWorkspace = async (id: number, name: string) => {
    const optimizationString = name.split(" ").join("");
    dispatch(addWorkspace(id));
    if (template === "List") {
      navigate(`/dashboard/list/${optimizationString}`);
    }
    if (template === "Board") {
      navigate(`/dashboard/kanban/${optimizationString}`);
    }
    if (template === "none") {
      dispatch(switchWidget("List"));
      navigate(`/dashboard/list/${optimizationString}`);
    }
  };

  return (
    <li
      onClick={() => handleClickToWorkspace(id, name)}
      className={cn("flex justify-between w-52", {
        ["bg-slate-200"]: state === true,
      })}
    >
      <div className="flex gap-2 items-center">
        <div
          className="rounded-full w-2 h-2"
          style={{ backgroundColor: `#${randomColor}` }}
        />
        <Page color="black" size="16px" weight="500">
          {name}
        </Page>
      </div>
      <Dots />
    </li>
  );
};

export default Workspace;
