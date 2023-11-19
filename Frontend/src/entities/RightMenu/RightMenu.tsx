import cn from "classnames";
import "./index.scss";
import { useSelector } from "react-redux";
import { selectMenuState } from "./model/MenuSliceSelectors";
import { useAppDispatch } from "shared/api/redux-hooks";
import { switchState } from "./model/MenuSlice";
import { AnimatePresence, motion } from "framer-motion";
import Close from "shared/ui/close/Close";
import EditableDiv from "shared/ui/editable/Editable";

const menuAnimation = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 300 },
};

const RightMenu = () => {
  const dispatch = useAppDispatch();
  const menuState = useSelector(selectMenuState);

  const handleClick = () => {
    dispatch(switchState(false));
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
          <div className="flex items-center justify-between flex-col gap-4 h-full">
            <div className="flex items-center flex-col gap-4 p-5 h-fit">
              {/* <textarea className=" w-64 flex justify-center border  h-fit bg-transparent rounded text-white flex-wrap"></textarea> */}
              <EditableDiv text={"Title"} />
              <EditableDiv text={"descr"} />
              <div className="bg-gray-200 p-3">Select panel</div>
            </div>
            <div>Added</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RightMenu;
