import "./index.scss";
import Plus from "shared/asset/PlusNewTodo.svg?react";
import { useAppDispatch } from "shared/api/redux-hooks";
import { switchModalWindow } from "shared/api/modal/modalSlice";
import { modalWindowSelector } from "shared/api/modal/modalSelectors";
import { useSelector } from "react-redux";
import Btn from "shared/ui/btns/Btn";
import Page from "shared/ui/p/Page";

const NewTodoComponent = () => {
  const dispatch = useAppDispatch();
  const modalStatus = useSelector(modalWindowSelector);

  const createHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(switchModalWindow(!modalStatus));
  };

  return (
    <div className="fixed right-10 bottom-5 flex gap-2 items-center ">
      <Btn type="newTodo" onClick={createHandler}>
        <Page color="white" size="14px" weight="700">
          <div className="flex gap-2 items-center">
            <Plus />
            New Task
          </div>
        </Page>
      </Btn>
    </div>
  );
};

export default NewTodoComponent;
