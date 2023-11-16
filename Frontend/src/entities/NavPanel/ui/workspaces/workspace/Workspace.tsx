import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "shared/api/redux-hooks";
import { addWorkspace } from "shared/api/user/UserSlice";
import { switchWidget } from "shared/api/view/ViewSlice";
import { selectView } from "shared/api/view/viewSliceSelector";
import Page from "shared/ui/p/Page";

export interface IWorksapce {
  id: number;
  name: string;
}

const Workspace: React.FC<IWorksapce> = ({ id, name }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const template = useSelector(selectView);

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
    <li onClick={() => handleClickToWorkspace(id, name)}>
      <Page color="black" size="16px" weight="500">
        {name}
      </Page>
    </li>
  );
};

export default Workspace;
