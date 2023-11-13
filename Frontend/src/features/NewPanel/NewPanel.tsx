import { todoApi } from "shared/api/todoQueryApi/TodoServise";
import { useSelector } from "react-redux";
import { selectWorkspaceData } from "shared/api/user/userSelectors";
import { useRef, useState } from "react";
import cn from "classnames";
import "./index.scss";

const NewPanel = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [inputForm, setInputForm] = useState<boolean>(false);
  const workspaceId = useSelector(selectWorkspaceData);
  const [createPanel] = todoApi.useNewPanelMutation();

  const handleNewPanelClick = () => {
    setInputForm(!inputForm);
  };

  const handleSavePanel = async () => {
    const newPanelFetchData = {
      id: workspaceId,
      titleData: {
        name: ref.current?.value,
      },
    };

    await createPanel(newPanelFetchData);
  };

  return (
    <>
      <div
        className="pl-12 text-xl cursor-pointer"
        onClick={handleNewPanelClick}
      >
        + Create new panel
      </div>
      <div
        className={cn("panelInputDiv", {
          ["activePanelInput"]: inputForm,
        })}
      >
        <input type="text" placeholder="panel title..." ref={ref} />
        <button onClick={handleSavePanel}>Save</button>
      </div>
    </>
  );
};

export default NewPanel;
