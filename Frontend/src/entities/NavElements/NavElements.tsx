import TodosMode from "shared/ui/todosMode/TodosMode";
import cn from "classnames";
import { data } from "./NavElement.data";
import { useLastPathname } from "shared/helpers/location/Location";

const NavElements = () => {
  const pathname = useLastPathname();

  return (
    <div className="navig">
      {data.map((elem) => {
        return (
          <TodosMode
            title={elem.title}
            path={elem.path}
            key={elem.title}
            className={cn({
              ["activeBlue"]: pathname === elem.path,
            })}
          >
            {elem.svgPic}
          </TodosMode>
        );
      })}
    </div>
  );
};

export default NavElements;
