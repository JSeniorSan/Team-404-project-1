import { CalendarIcon, EditIcon } from "@chakra-ui/icons";
import { ITodo } from "shared/api/todoQueryApi/todoInterfaces";
type RightMenuFormType = {
  task: ITodo | undefined;
  handleChangeClick: () => void;
};

const RightMenuForm: React.FC<RightMenuFormType> = ({
  task,
  handleChangeClick,
}) => {
  return (
    <div className=" w-full flex flex-col ">
      <div className="flex items-start flex-col gap-4 p-5 h-fit border-2 mt-10 w-full rounded border-indigo-300">
        <EditIcon
          className=" text-slate-200 cursor-pointer hover:text-red-200 hover:scale-150"
          onClick={handleChangeClick}
        />
        <div className="text-xl font-bold">Заголовок</div>
        <div className="text-2xl font-medium ">{task?.title}</div>
        <div className="w-full flex text-xl">Описание</div>
        <div className="text-xl w-48  break-after-all">{task?.description}</div>
      </div>
      <div className="flex items-start p-5 h-fit border-2 mt-3 w-full rounded border-indigo-300">
        <div className="flex items-center gap-3 cursor-pointer">
          <CalendarIcon />
          Calendar
        </div>
      </div>
      <div className="flex items-start p-5 h-fit border-2 mt-3 w-full rounded border-indigo-300">
        <div className="flex items-center gap-3 cursor-pointer">Теги</div>
      </div>
    </div>
  );
};

export default RightMenuForm;
