import { switchState } from "entities/RightMenu/model/MenuSlice";
import { selectMenuState } from "entities/RightMenu/model/MenuSliceSelectors";
import { useSelector } from "react-redux";
import { useAppDispatch } from "shared/api/redux-hooks";

const useMenu = () => {
  const dispatch = useAppDispatch();
  const menuState = useSelector(selectMenuState);
  const handleSideMenu = () => {
    dispatch(switchState(!menuState));
  };

  return { handleSideMenu, dispatch, menuState };
};

export default useMenu;
