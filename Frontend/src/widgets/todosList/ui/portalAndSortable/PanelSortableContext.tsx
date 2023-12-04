import { SortableContext } from "@dnd-kit/sortable";
import PanelsList from "./panelList/PanelsList";
import { IPanel, ITodo } from "shared/api/todoQueryApi/todoInterfaces";

export interface IPanelSortableContex {
  columsId: number[];
  colums: IPanel[];
  viewType: string;
  tasks: ITodo[];
}

const PanelSortableContext: React.FC<IPanelSortableContex> = ({
  columsId,
  colums,
  viewType,
  tasks,
}) => {
  return (
    <SortableContext items={columsId}>
      {colums &&
        colums.map((panel) => {
          const filtering = tasks.filter((ts) => {
            return ts.panel_id == panel.id;
          });

          return (
            <PanelsList
              panel={panel}
              type={viewType}
              key={panel.id}
              tasks={filtering}
            />
          );
        })}
    </SortableContext>
  );
};

export default PanelSortableContext;
