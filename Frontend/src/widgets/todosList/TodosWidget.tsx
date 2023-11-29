import NewPanel from "features/NewPanel/NewPanel";
import RightMenu from "widgets/rightWidgetMenu/RightMenu";
import { useSelector } from "react-redux";

import { selectView } from "shared/api/view/viewSliceSelector";
import cn from "classnames";
import "./index.scss";
import { DndContext, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import { useMemo, useState } from "react";
import PanelsList from "./ui/PanelsList";
import { SortableContext } from "@dnd-kit/sortable";
import { IPanel } from "shared/api/user/UserSlice";
import { createPortal } from "react-dom";

export interface IPropsPanels {
  kanbanDataPanels: IPanel[];
}

const TodosWidget: React.FC<IPropsPanels> = ({ kanbanDataPanels }) => {
  const viewType = useSelector(selectView);

  const columsId = useMemo(
    () => kanbanDataPanels.map((col) => col.id),
    [kanbanDataPanels]
  );

  const [activePanel, setActivePanel] = useState<IPanel | null>(null);

  function onDragStart(event: DragStartEvent) {
    console.log("drag start", event);
    if (event.active.data.current?.type === "Column") {
      setActivePanel(event.active.data.current?.panel);
    }
  }

  return (
    <div className="flex flex-col gap-5 h-full mb-3">
      <DndContext onDragStart={onDragStart}>
        <div
          className={cn({
            ["listPanelsFormat"]: viewType === "List",
            ["boardPanelsFormat"]: viewType === "Board",
          })}
        >
          <SortableContext items={columsId}>
            {kanbanDataPanels &&
              kanbanDataPanels.map((panel) => {
                return <PanelsList panel={panel} key={panel.id} />;
              })}
          </SortableContext>
          <NewPanel />
          <RightMenu />
        </div>
        {createPortal(
          <DragOverlay>
            {activePanel && <PanelsList panel={activePanel} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
};
export default TodosWidget;
