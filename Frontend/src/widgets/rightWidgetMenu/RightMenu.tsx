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
import { useEffect, useState, useRef } from "react";
import Delete from "shared/ui/delete/Delete";
import { Input } from "@chakra-ui/react";
import { EditIcon, CalendarIcon } from "@chakra-ui/icons";

// import { format, parseISO } from "date-fns";

const menuAnimation = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 400 },
};

const RightMenu = () => {
  const refTitle = useRef<HTMLInputElement>(null);
  const refDescription = useRef<HTMLInputElement>(null);
  const [changeTask] = todoApi.useChangeTaskMutation();
  const [state, setState] = useState<boolean>(false);
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

  // const dat = new Date(`${task?.created_at}`);
  // const f = new Intl.DateTimeFormat("en-US", {
  //   dateStyle: "medium",
  //   timeStyle: "short",
  // });
  // const newDate = f.format(dat);
  // console.log(newDate);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (taskId && refDescription.current && refTitle.current) {
      changeTask({
        id: taskId.toString(),
        infoData: {
          description: refDescription.current?.value,
          title: refTitle.current?.value,
          panel_id: task!.panel_id,
        },
      });
    }
  };

  const handleChangeClick = () => {
    setState(!state);
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
            {!state && (
              <div className=" w-full flex flex-col ">
                <form
                  className="flex items-start flex-col gap-4 p-5 h-fit border mt-10 w-full rounded"
                  onSubmit={handleSubmit}
                >
                  <EditIcon
                    className=" text-slate-200 cursor-pointer hover:text-red-200"
                    onClick={handleChangeClick}
                  />
                  <div>Заголовок</div>
                  <div className="text-2xl font-medium ">{task?.title}</div>
                  <div className="w-full flex">Описание</div>
                  <div className="text-xl w-48  break-after-all">
                    {task?.description}
                  </div>
                </form>
                <div className="flex items-start p-5 h-fit border mt-3 w-full rounded ">
                  <div className="flex items-center gap-3 cursor-pointer">
                    <CalendarIcon />
                    Calendar
                  </div>
                </div>
                <div className="flex items-start p-5 h-fit border mt-3 w-full rounded ">
                  <div className="flex items-center gap-3 cursor-pointer">
                    Теги
                  </div>
                </div>
              </div>
            )}
            {state && (
              <form
                className="flex items-start flex-col gap-4 p-5 h-fit border mt-10 w-full rounded ml-5"
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
              <div className="text-base">{`Created at `}</div>
              {taskId && <Delete taskId={taskId} />}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RightMenu;
