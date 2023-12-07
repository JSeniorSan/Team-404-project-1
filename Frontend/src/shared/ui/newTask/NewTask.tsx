import Plus from "shared/asset/Plus.svg?react";
import Page from "../p/Page";
import { useAppDispatch } from "shared/hooks/redux-hooks";
import { useSelector } from "react-redux";
import { modalWindowSelector } from "shared/api/modal/modalSelectors";
import { switchModalWindow } from "shared/api/modal/modalSlice";
import { columnModalId } from "pages/TodoPages/model/ModalWindowSlice";

export type newTaskProps = {
  columnId: number;
};

const NewTask: React.FC<newTaskProps> = ({ columnId }) => {
  const dispatch = useAppDispatch();

  const modalStatus = useSelector(modalWindowSelector);
  function createHandler(event: React.MouseEvent) {
    event.stopPropagation();
    dispatch(switchModalWindow(!modalStatus));
    dispatch(columnModalId(columnId));
  }
  return (
    <div
      className="flex gap-2 items-center p-2 border rounded-lg w-full cursor-pointer hover:bg-slate-100 hover:shadow-md"
      onClick={createHandler}
    >
      <Plus />
      <Page color="gray" size="16px" weight="600">
        Add new task
      </Page>
    </div>
  );
};

export default NewTask;
