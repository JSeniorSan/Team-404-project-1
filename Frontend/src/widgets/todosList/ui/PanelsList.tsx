import Template from "entities/Template/ui/Template";
import Panel from "./Panel";
import ListSection from "./ListSection";
import BoardSection from "./BoardSection";

import { useSelector } from "react-redux";
import { selectView } from "shared/api/view/viewSliceSelector";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IPanel } from "shared/api/user/UserSlice";

export interface IPanelList {
  panel: IPanel;
}

const PanelsList: React.FC<IPanelList> = ({ panel }) => {
  const viewType = useSelector(selectView);

  const {
    setNodeRef,
    transform,
    transition,
    attributes,
    listeners,
    isDragging,
  } = useSortable({
    id: panel.id,
    data: {
      type: "Column",
      panel,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="flex flex-col gap-10  border w-[450px] h-[300px]  border-slate-400-500 "
      ></div>
    );
  }

  return (
    <Template
      ref={setNodeRef}
      style={style}
      className="flex flex-col gap-10  border w-[250px] h-[300px]  "
    >
      <Panel
        className="flex justify-between pb-5 border-b-2 rounded-sm items-center relative w-[250px] cursor-grab"
        panelTitle={panel.name}
        todosCount={panel.tasks.length}
        panelId={panel.id}
        {...attributes}
        {...listeners}
      />
      {viewType === "List" && <ListSection list={panel.tasks} />}
      {viewType === "Board" && <BoardSection list={panel.tasks} />}
    </Template>
  );
};

export default PanelsList;
