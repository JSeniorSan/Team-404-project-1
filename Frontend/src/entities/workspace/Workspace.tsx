import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "shared/hooks/redux-hooks";
import { addWorkspace } from "shared/api/user/UserSlice";
import { switchWidget } from "shared/api/view/ViewSlice";
import { selectView } from "shared/api/view/viewSliceSelector";
import Page from "shared/ui/p/Page";
import Dots from "shared/asset/tabler_dots.svg?react";
import cn from "classnames";
import { useEffect, useState } from "react";
import { selectWorkspaceData } from "shared/api/user/userSelectors";
import { switchState } from "widgets/rightWidgetMenu/model/MenuSlice";
import WorkspaceFeatures from "shared/ui/miniMenu/addons/WorkspaceDropMenu/WorkspaceDropMenu";
import { IWorkspaceData } from "shared/api/todoQueryApi/todoInterfaces";

export interface IModuleWorkspace {
  id: number;
  name: string;
  color: string;
  allWorkspaces: IWorkspaceData[];
}

const Workspace: React.FC<IModuleWorkspace> = ({
  id,
  name,
  color,
  allWorkspaces,
}) => {
  const [state, setState] = useState<boolean>(false);
  const [stateDots, setStateDots] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const template = useSelector(selectView);
  const getId = useSelector(selectWorkspaceData);

  const handleClickDots = (event: React.MouseEvent) => {
    event.stopPropagation();
    setStateDots(!stateDots);
  };

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
    dispatch(switchState({ todoId: null, isOpen: false }));

    if (template === "Board") {
      navigate(`/dashboard/kanban/${optimizationString}`);
    } else {
      navigate(`/dashboard/list/${optimizationString}`);
      dispatch(switchWidget("List"));
    }
  };

  function handleClick() {
    handleClickToWorkspace(id, name);
  }

  function handleLeaveMouse() {
    if (stateDots) {
      setStateDots(!stateDots);
    }
  }

  return (
    <li
      onClick={handleClick}
      className={cn("flex w-full relative", {
        ["bg-slate-100"]:
          state === true && (template === "Board" || template === "List"),
      })}
      onMouseLeave={handleLeaveMouse}
    >
      <div className="flex gap-2 items-center">
        <div
          className="rounded-full w-2 h-2"
          style={{ backgroundColor: `${color}` }}
        />
        <Page color="black" size="16px" weight="500">
          {name}
        </Page>
      </div>
      <div className="w-5 absolute right-5" onClick={handleClickDots}>
        <Dots />
      </div>
      <WorkspaceFeatures
        menu={stateDots}
        workspaceId={id}
        allWorkspaces={allWorkspaces}
      />
    </li>
  );
};

export default Workspace;
