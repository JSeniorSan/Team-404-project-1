import { EditIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/react";
import { useRef } from "react";
import { todoApi } from "shared/api/todoQueryApi/TodoServise";
import { ITodo } from "shared/api/todoQueryApi/todoInterfaces";
import Btn from "shared/ui/btns/Btn";

type EditRightMenuType = {
  taskId: number | undefined;
  handleChangeClick: () => void;
  task: ITodo | undefined;
};

const EditRightMenuForm: React.FC<EditRightMenuType> = ({
  taskId,
  handleChangeClick,
  task,
}) => {
  const refTitle = useRef<HTMLInputElement>(null);
  const refDescription = useRef<HTMLInputElement>(null);
  const [changeTask] = todoApi.useChangeTaskMutation();
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
  return (
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
      <Btn className="border-gray-500">Save</Btn>
    </form>
  );
};

export default EditRightMenuForm;
