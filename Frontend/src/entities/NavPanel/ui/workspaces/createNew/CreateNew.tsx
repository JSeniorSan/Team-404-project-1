import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { IWorkspaceData } from "shared/api/todoQueryApi/TodoServise";
import Plus from "shared/asset/Plus.svg?react";

import DropPanel from "shared/ui/dropPanel/DropPanel";

export interface INewWorkspace {
  allWorkspaces: IWorkspaceData[] | undefined;
}

const CreateNew: React.FC<INewWorkspace> = () => {
  const [newWorkspace, setNewWorkspace] = useState<boolean>(false);

  const handleSetNew = () => {
    setNewWorkspace(!newWorkspace);
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
        <AnimatePresence>
          <DropPanel
            setNewWorkspace={setNewWorkspace}
            newWorkspace={newWorkspace}
          />
        </AnimatePresence>
      )}
    </>
  );
};

export default CreateNew;
