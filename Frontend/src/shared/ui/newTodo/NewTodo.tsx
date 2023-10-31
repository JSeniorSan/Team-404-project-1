import Page from "../p/Page";
import "./index.scss";
import Plus from "../../asset/Plus.svg?react";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface INewTodo
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

const NewTodo: React.FC<INewTodo> = ({ ...props }) => {
  return (
    <button className="newTodo" {...props}>
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
