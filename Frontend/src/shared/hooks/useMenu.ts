import { switchState } from "widgets/rightWidgetMenu/model/MenuSlice";
import { selectMenuIsOpen } from "widgets/rightWidgetMenu/model/MenuSliceSelectors";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "shared/hooks/redux-hooks";

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
