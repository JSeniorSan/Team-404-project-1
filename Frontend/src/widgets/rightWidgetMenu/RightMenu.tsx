import cn from "classnames";
import "./index.scss";
import { useSelector } from "react-redux";
import { selectMenuIsOpen, selectMenuTodoId } from "./model/MenuSliceSelectors";
import { useAppDispatch } from "shared/hooks/redux-hooks";
import { switchState } from "./model/MenuSlice";
import { AnimatePresence, motion } from "framer-motion";
import Close from "shared/ui/close/Close";
import { todoApi } from "shared/api/todoQueryApi/TodoServise";
import { useEffect, useState, useRef } from "react";
import Delete from "shared/ui/delete/Delete";
import { EditIcon, CalendarIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/react";
import Btn from "shared/ui/btns/Btn";

const menuAnimation = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 400 },
};

const RightMenu = () => {
  const refTitle = useRef<HTMLInputElement>(null);
  const refDescription = useRef<HTMLInputElement>(null);
  const [changeTask] = todoApi.useChangeTaskMutation();
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (taskId && refDescription.current && refTitle.current) {
      const changeData = {
        description: refDescription.current?.value,
        title: refTitle.current?.value,
        taskId: taskId,
      };
      await changeTask(changeData);
    }
  };

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
              <div className=" w-full flex flex-col ">
                <form
                  className="flex items-start flex-col gap-4 p-5 h-fit border-2 mt-10 w-full rounded border-indigo-300"
                  onSubmit={handleSubmit}
                >
                  <EditIcon
                    className=" text-slate-200 cursor-pointer hover:text-red-200 hover:scale-150"
                    onClick={handleChangeClick}
                  />
                  <div>Заголовок</div>
                  <div className="text-2xl font-medium ">{task?.title}</div>
                  <div className="w-full flex">Описание</div>
                  <div className="text-xl w-48  break-after-all">
                    {task?.description}
                  </div>
                </form>
                <div className="flex items-start p-5 h-fit border-2 mt-3 w-full rounded border-indigo-300">
                  <div className="flex items-center gap-3 cursor-pointer">
                    <CalendarIcon />
                    Calendar
                  </div>
                </div>
                <div className="flex items-start p-5 h-fit border-2 mt-3 w-full rounded border-indigo-300">
                  <div className="flex items-center gap-3 cursor-pointer">
                    Теги
                  </div>
                </div>
              </div>
            )}
            {changeForm && (
              <form
                className="flex items-start flex-col gap-4 p-5 h-fit border border-blue-800 mt-10 w-full rounded ml-5"
                onSubmit={handleSubmit}
              >
                <EditIcon
                  className="mt-5 text-slate-200 cursor-pointer hover:text-orange-200"
                  onClick={handleChangeClick}
                />
                <Input
                  className="text-2xl font-medium"
                  type="text"
                  variant="withoutLine"
                  placeholder="Title"
                  ref={refTitle}
                  defaultValue={task?.title}
                />
                <Input
                  className="text-xl"
                  type="text"
                  variant="withoutLine"
                  placeholder="Title"
                  defaultValue={task?.description}
                  ref={refDescription}
                />
                <Btn>Save</Btn>
              </form>
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
