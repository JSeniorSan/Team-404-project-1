import { todoApi } from "shared/api/todoQueryApi/TodoServise";
import Btn from "../../../../../shared/ui/btns/Btn";
import HexColor from "../../../../../shared/ui/hexColor/HexColor";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Input from "../../../../../shared/ui/input/Input";
import cn from "classnames";

const sidebarAimation = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: {
    opacity: 1,
    x: -300,
    transition: { duration: 0.5 },
  },
};

export interface IDropPanel {
  setNewWorkspace: (value: boolean) => void;
}

const DropPanel: React.FC<IDropPanel> = ({ setNewWorkspace }) => {
  const [color, setColor] = useState<string>("#aabbcc");
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
      <HexColor color={color} setColor={setColor} />
      <Btn onClick={handleCreateNew}>Save</Btn>
    </motion.div>
  );
};

export default DropPanel;
