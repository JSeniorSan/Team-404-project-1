import cn from "classnames";
import "./index.scss";
import { useSelector } from "react-redux";
import { selectMenuState } from "./model/MenuSliceSelectors";
import { useAppDispatch } from "shared/api/redux-hooks";
import { switchState } from "./model/MenuSlice";
import { AnimatePresence, motion } from "framer-motion";

const variants = {
  open: { opacity: 1, x: 0, scale: 1 },
  close: {
    opacity: 0,
    x: "80%",
  },
};

const RightMenu = () => {
  const dispatch = useAppDispatch();
  const menuState = useSelector(selectMenuState);

  const handleClick = () => {
    dispatch(switchState(false));
  };

  return (
    <AnimatePresence>
      <motion.div
        animate={menuState ? "open" : "close"}
        variants={variants}
        className={cn("menuState", {
          ["menuActive"]: menuState,
        })}
      >
        <div onClick={handleClick} className="cursor-pointer text-4xl">
          Close
        </div>
        <div className="p-10 font-medium text-2xl">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Exercitationem sit fugit vel vero commodi eaque quisquam, dolorem
          temporibus tempora deleniti omnis corporis velit, placeat aliquid
          eveniet perferendis, voluptatem mollitia quia.
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default RightMenu;
