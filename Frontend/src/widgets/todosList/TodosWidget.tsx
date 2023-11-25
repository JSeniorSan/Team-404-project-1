import Template from "features/Template/ui/Template";
import NewPanel from "features/NewPanel/NewPanel";
import ListSection from "./ui/ListSection";
import RightMenu from "entities/RightMenu/RightMenu";
import { useSelector } from "react-redux";
import { IPanel } from "shared/api/user/UserSlice";
import Panel from "widgets/todosList/ui/Panel";
import { selectView } from "shared/api/view/viewSliceSelector";
import BoardSection from "widgets/todosBoard/ui/BoardSection";
import cn from "classnames";
import "./index.scss";

export interface IPropsPanels {
  kanbanDataPanels: IPanel[];
}

const TodosWidget: React.FC<IPropsPanels> = ({ kanbanDataPanels }) => {
  const viewType = useSelector(selectView);
  return (
    <div className="flex flex-col gap-5 h-fit mb-3">
      <div
        className={cn({
          ["listPanelsFormat"]: viewType === "List",
          ["boardPanelsFormat"]: viewType === "Board",
        })}
      >
        {kanbanDataPanels &&
          kanbanDataPanels.map((panel) => {
            return (
              <Template
                className="flex flex-col gap-20 justify-center items-start px-12 w-full h-fit"
                key={panel.id}
              >
                <Panel
                  className="flex justify-between pb-5 border-b-2 rounded-sm items-center relative"
                  panelTitle={panel.name}
                  todosCount={panel.tasks.length}
                  panelId={panel.id}
                />
                {viewType === "List" && <ListSection list={panel.tasks} />}
                {viewType === "Board" && <BoardSection list={panel.tasks} />}
              </Template>
            );
          })}
        <NewPanel />
        <RightMenu />
      </div>
    </div>
  );
};
export default TodosWidget;
