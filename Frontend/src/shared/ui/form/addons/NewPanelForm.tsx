import Btn from "shared/ui/btns/Btn";
import Input from "shared/ui/input/Input";
import cn from "classnames";
import { todoApi } from "shared/api/todoQueryApi/TodoServise";
import { useSelector } from "react-redux";
import { selectWorkspaceData } from "shared/api/user/userSelectors";
import { useRef } from "react";
import { motion } from "framer-motion";

export interface ISavePanel {
  inputForm: boolean;
}

const NewPanelForm: React.FC<ISavePanel> = ({ inputForm }) => {
  const ref = useRef<HTMLInputElement>(null);
  const workspaceId = useSelector(selectWorkspaceData);
  const [createPanel] = todoApi.useNewPanelMutation();

  const handleSavePanel = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPanelFetchData = {
      id: workspaceId,
      titleData: {
        name: ref.current?.value,
      },
    };
    await createPanel(newPanelFetchData);
  };

  return (
    <motion.form
      onSubmit={handleSavePanel}
      className={cn({
        ["hidden"]: !inputForm,
        ["flex gap-3"]: inputForm,
      })}
    >
      <Input placeholder="Panel title" type="text" variant="input" ref={ref} />
      <Btn type="newTodo" color="white">
        Submit
      </Btn>
    </motion.form>
  );
};

export default NewPanelForm;
