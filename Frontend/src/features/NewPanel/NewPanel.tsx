import { useState } from "react";
import "./index.scss";
import ToggleText from "shared/ui/toggleText/ToggleText";
import NewPanelForm from "shared/ui/form/addons/NewPanelForm";

const NewPanel = () => {
  const [InputFormStatus, setInputFormStatus] = useState<boolean>(false);

  return (
    <div className="flex gap-4 mb-10 items-center">
      <ToggleText
        text="+ Create new panel"
        setStatus={setInputFormStatus}
        status={InputFormStatus}
      />
      <NewPanelForm inputForm={InputFormStatus} />
    </div>
  );
};

export default NewPanel;
