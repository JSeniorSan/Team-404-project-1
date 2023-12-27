import TodosMode from "shared/ui/todosMode/TodosMode";
import cn from "classnames";
import { useLastPathname } from "shared/helpers/location/Location";
import { data } from "./LeftHeaderItems.data";

const LeftHeaderItems = () => {
  const pathname = useLastPathname();
  console.log("path", pathname);
  return (
    <div className="flex gap-4 items-center">
      {data.map((elem) => {
        return (
          <TodosMode
            path={elem.path}
            title={elem.title}
            className={cn({
              ["activeBlue"]: pathname === elem.path,
            })}
            key={elem.path}
          >
            {elem.svg}
          </TodosMode>
        );
      })}
    </div>
  );
};

export default LeftHeaderItems;
