import Template from "features/Template/ui/Template";
import TaskTitle from "widgets/todosList/ui/TaskTitle";
import NewPanel from "features/NewPanel/NewPanel";
import ListSection from "./ui/ListSection";
import RightMenu from "entities/RightMenu/RightMenu";
import { useAppDispatch } from "shared/api/redux-hooks";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectWorkspaceData } from "shared/api/user/userSelectors";
import { switchWidget } from "shared/api/view/ViewSlice";
import { IPanel } from "shared/api/user/UserSlice";

export interface IPropsPanels {
  kanbanDataPanels: IPanel[];
}

const TodosList: React.FC<IPropsPanels> = ({ kanbanDataPanels }) => {
  const dispatch = useAppDispatch();
  const workspaceId = useSelector(selectWorkspaceData);
  useEffect(() => {
    dispatch(switchWidget("List"));
  }, [dispatch, workspaceId]);
  return (
    <div className="flex flex-col gap-5 h-fit mb-3">
      <div className="flex h-fit flex-col gap-10">
        {kanbanDataPanels &&
          kanbanDataPanels.map((panel) => {
            return (
              <Template className="template" key={panel.id}>
                <TaskTitle
                  panelTitle={panel.name}
                  todosCount={panel.tasks.length}
                  panelId={panel.id}
                />
                <ListSection list={panel.tasks} />
              </Template>
            );
          })}
        <NewPanel />
        <RightMenu />
      </div>
    </div>
  );
};
export default TodosList;
