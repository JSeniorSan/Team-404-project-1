import { todoApi } from "shared/api/todoQueryApi/TodoServise";
import Btn from "../btns/Btn";
import HexColor from "../hexColor/HexColor";
import { useRef } from "react";
import { motion } from "framer-motion";
import Input from "../input/Input";
import cn from "classnames";

const sidebarAimation = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};

export interface IDropPanel {
  setNewWorkspace: (value: boolean) => void;
  newWorkspace: boolean;
}

const DropPanel: React.FC<IDropPanel> = ({ setNewWorkspace, newWorkspace }) => {
  const ref = useRef<HTMLInputElement | null>(null);
  const [createNewWorkspace] = todoApi.useCreateNewWorkspaceMutation();

  const handleCreateNew = () => {
    if (ref) {
      createNewWorkspace({ name: ref.current?.value });
      setNewWorkspace(false);
    }
  };

  return (
    <motion.div
      className={cn(
        "absolute left-60 z-30 bg-slate-100 p-7 flex flex-col gap-7 rounded-md backdrop-blur-md opacity-10 shadow-md "
      )}
      {...sidebarAimation}
    >
      <Input
        type="text"
        placeholder="Workspace name..."
        variant="withoutLine"
        ref={ref}
      />
      <HexColor />
      <Btn onClick={handleCreateNew}>Save</Btn>
    </motion.div>
  );
};

export default DropPanel;
