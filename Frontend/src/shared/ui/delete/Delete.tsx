import { DeleteIcon } from "@chakra-ui/icons";
import { switchState } from "widgets/rightWidgetMenu/model/MenuSlice";
import { useAppDispatch } from "shared/api/redux-hooks";
import { todoApi } from "shared/api/todoQueryApi/TodoServise";

const Delete = ({ taskId }: { taskId: number }) => {
  const [deleteTask] = todoApi.useRemoveTaskMutation();
  const dispatch = useAppDispatch();
  const handleDelete = async () => {
    await deleteTask(taskId);
    dispatch(switchState({ isOpen: false, todoId: null }));
  };

  return (
    <DeleteIcon
      color={"white"}
      boxSize={6}
      className="hover:cursor-pointer"
      onClick={handleDelete}
    />
  );
};

export default Delete;