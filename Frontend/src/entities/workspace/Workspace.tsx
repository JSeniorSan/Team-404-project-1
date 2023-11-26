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
import { switchState } from "widgets/rightWidgetMenu/model/MenuSlice";
import WorkspaceFeatures from "shared/ui/miniMenu/addons/WorkspaceDropMenu/WorkspaceDropMenu";

export interface IWorksapce {
  id: number;
  name: string;
  color: string;
}

const Workspace: React.FC<IWorksapce> = ({ id, name, color }) => {
  const [state, setState] = useState<boolean>(false);
  const [stateDots, setStateDots] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const template = useSelector(selectView);
  const getId = useSelector(selectWorkspaceData);

  const handleClickDots = () => {
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

  return (
    <li
      onClick={() => handleClickToWorkspace(id, name)}
      className={cn("flex w-full relative justify-between", {
        ["bg-slate-100"]: state === true,
      })}
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
      <div className="w-5" onClick={handleClickDots}>
        <Dots />
      </div>

      <WorkspaceFeatures menu={stateDots} workspaceId={id} />
    </li>
  );
};

export default Workspace;
