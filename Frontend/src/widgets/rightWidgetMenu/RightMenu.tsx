import cn from "classnames";
import "./index.scss";
import { useSelector } from "react-redux";
import { selectMenuIsOpen, selectMenuTodoId } from "./model/MenuSliceSelectors";
import { useAppDispatch } from "shared/hooks/redux-hooks";
import { switchState } from "./model/MenuSlice";
import { AnimatePresence, motion } from "framer-motion";
import Close from "shared/ui/close/Close";
import { todoApi } from "shared/api/todoQueryApi/TodoServise";
import { useEffect, useState } from "react";
import Delete from "shared/ui/delete/Delete";
import EditRightMenuForm from "./ui/EditRightMenuForm";
import RightMenuForm from "./ui/RightMenuForm";

const menuAnimation = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 400 },
};

const RightMenu = () => {
  const [changeForm, setChangeForm] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const menuState = useSelector(selectMenuIsOpen);
  const taskId = useSelector(selectMenuTodoId);
  const [getTask, { data: task }] = todoApi.useLazyGetOneTaskQuery();

  const handleClick = () => {
    dispatch(switchState({ isOpen: !menuState, todoId: null }));
  };
  useEffect(() => {
    if (taskId) {
      getTask(taskId);
    }
  }, [taskId, getTask]);

  const formater = new Intl.DateTimeFormat("en-US", { dateStyle: "long" });

  const handleChangeClick = () => {
    setChangeForm(!changeForm);
  };

  return (
    <AnimatePresence>
      {menuState && (
        <motion.div
          {...menuAnimation}
          className={cn("menuState", {
            ["menuActive"]: menuState,
          })}
        >
          <Close onClick={handleClick} />
          <div className="flex items-center flex-col h-full p-5 justify-between">
            {!changeForm && (
              <RightMenuForm
                handleChangeClick={handleChangeClick}
                task={task}
              />
            )}
            {changeForm && (
              <EditRightMenuForm
                handleChangeClick={handleChangeClick}
                task={task}
                taskId={task?.id}
              />
            )}

            <div className="flex items-baseline p-5 h-fit  mt-3 w-full rounded justify-between">
              <div className="text-base">
                {task
                  ? `Created at ${formater.format(
                      new Date(String(task.created_at).substring(0, 10))
                    )}`
                  : ""}
              </div>
              {taskId && <Delete taskId={taskId} />}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RightMenu;
