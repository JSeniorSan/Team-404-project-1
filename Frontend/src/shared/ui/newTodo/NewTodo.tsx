import Page from "../p/Page";
import "./index.scss";
import Plus from "../../asset/Plus.svg?react";
const NewTodo = () => {
  return (
    <button className="newTodo">
      <Page color="white" size="14px" weight="700">
        <div className="flex gap-2 items-center">
          <Plus />
          New Task
        </div>
      </Page>
    </button>
  );
};

export default NewTodo;
