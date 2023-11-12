import { useRef } from "react";
import { todoApi } from "../../../../../shared/api/todoQueryApi/TodoServise";
import Plus from "../../../../../shared/asset/Plus.svg?react";
import Btn from "../../../../../shared/ui/btns/Btn";
export interface INewWorkspace {
  newWorkspace: boolean;
  setNewWorkspace: (value: boolean) => void;
}

const CreateNew: React.FC<INewWorkspace> = ({
  setNewWorkspace,
  newWorkspace,
}) => {
  const ref = useRef<HTMLInputElement | null>(null);

  const [createNewWorkspace] = todoApi.useCreateNewWorkspaceMutation();

  const handleSetNew = () => {
    setNewWorkspace(!newWorkspace);
  };

  const handleCreateNew = () => {
    if (ref) {
      createNewWorkspace({ name: ref.current?.value });
      setNewWorkspace(false);
    }
  };

  return (
    <>
      <div className="spaces__title">
        WORKSPACE
        <Plus
          onClick={handleSetNew}
          className="cursor-pointer hover:bg-slate-100 rounded transition-all "
        />
      </div>
      {newWorkspace && (
        <div>
          <input
            type="text"
            placeholder="Workspace name..."
            name="workspace"
            ref={ref}
          />
          <Btn onClick={handleCreateNew}>Save</Btn>
        </div>
      )}
    </>
  );
};

export default CreateNew;
