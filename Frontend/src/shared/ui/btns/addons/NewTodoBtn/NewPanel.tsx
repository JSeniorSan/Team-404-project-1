import "./index.scss";
import Plus from "shared/asset/PlusNewTodo.svg?react";
import Btn from "shared/ui/btns/Btn";
import Page from "shared/ui/p/Page";
import NewPanelForm from "shared/ui/form/addons/NewPanelForm";
import { useState } from "react";

const NewPanel = () => {
  const [inputFormStatus, setInputFormStatus] = useState<boolean>(false);
  const createHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    setInputFormStatus(!inputFormStatus);
  };

  return (
    <div className="fixed sm:right-10 right-0 bottom-5 flex gap-2 items-center ">
      <div className="flex flex-col gap-3 ">
        <NewPanelForm inputForm={inputFormStatus} />
        <Btn type="newPanel" onClick={createHandler}>
          <Page color="white" size="14px" weight="700">
            <div className="flex gap-2 items-center">
              <Plus />
              New Panel
            </div>
          </Page>
        </Btn>
      </div>
    </div>
  );
};

export default NewPanel;
