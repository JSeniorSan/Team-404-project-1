import cn from "classnames";
import "./index.scss";
import { useSelector } from "react-redux";
import { selectMenuIsOpen, selectMenuTodoId } from "./model/MenuSliceSelectors";
import { useAppDispatch } from "shared/api/redux-hooks";
import { switchState } from "./model/MenuSlice";
import { AnimatePresence, motion } from "framer-motion";
import Close from "shared/ui/close/Close";
import Btn from "shared/ui/btns/Btn";
import { todoApi } from "shared/api/todoQueryApi/TodoServise";
import { useEffect } from "react";

const menuAnimation = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 400 },
};

const RightMenu = () => {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("patch");
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
          <div className="flex items-center justify-between flex-col gap-4 h-full p-5">
            <form
              className="flex items-start flex-col gap-4 p-5 h-fit border mt-10 w-full rounded ml-5"
              onSubmit={handleSubmit}
            >
              <div className="text-2xl font-medium">{task?.title}</div>
              <div className="text-xl">{task?.description}</div>
              <Btn>Save</Btn>
            </form>
            <div>Added</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RightMenu;
