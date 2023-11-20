import { switchState } from "entities/RightMenu/model/MenuSlice";
import { selectMenuIsOpen } from "entities/RightMenu/model/MenuSliceSelectors";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "shared/api/redux-hooks";

const useMenu = () => {
  const [id, setId] = useState<number>(0);
  const dispatch = useAppDispatch();
  const menuState = useSelector(selectMenuIsOpen);

  const handleSideMenu = () => {
    dispatch(switchState({ isOpen: true, todoId: id }));
  };

  return { handleSideMenu, dispatch, menuState, setId, id };
};

export default useMenu;
