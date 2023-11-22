import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import Plus from "shared/asset/Plus.svg?react";
import DropPanel from "entities/NavPanel/ui/workspaces/dropPanel/DropPanel";

const CreateNew = () => {
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

      <AnimatePresence>
        {newWorkspace && <DropPanel setNewWorkspace={setNewWorkspace} />}
      </AnimatePresence>
    </>
  );
};

export default CreateNew;
