import { DragOverlay } from "@dnd-kit/core";
import { createPortal } from "react-dom";
import PanelsList from "./panelList/PanelsList";
import CardUi from "entities/card/ui/CardUi";
import { IPanel, ITodo } from "shared/api/todoQueryApi/todoInterfaces";

export interface IPortalDragOverlay {
  activePanel: IPanel | null;
  activeTask: ITodo | null;
  tasks: ITodo[];
  viewType: string;
}

const PortalDragOverlay: React.FC<IPortalDragOverlay> = ({
  activePanel,
  viewType,
  tasks,
  activeTask,
}) => {
  return (
    <>
      {createPortal(
        <DragOverlay>
          {activePanel && (
            <PanelsList
              panel={activePanel}
              type={viewType}
              tasks={tasks.filter((ts) => ts.panel_id === activePanel.id)}
            />
          )}
          {activeTask && (
            <CardUi
              task={activeTask}
              widgets={viewType === "board" ? true : false}
            >
              {activeTask.description}
            </CardUi>
          )}
        </DragOverlay>,
        document.body
      )}
    </>
  );
};

export default PortalDragOverlay;
