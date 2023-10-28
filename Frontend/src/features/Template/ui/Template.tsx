import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../shared/api/redux-hooks";
import Wrapper from "../../../shared/ui/wrapper/Wrapper";
import "./index.scss";
import { ITemplate } from "./template.interfaces";
import { modalWindowSelector } from "../../../shared/api/todo/modalSelectors";
import { switchModalWindow } from "../../../shared/api/todo/modalSlice";
import BtnDone from "../../../shared/ui/btns/btn-done/Btn-done";

const Template: React.FC<ITemplate> = ({ className, children, ...props }) => {
  const dispatch = useAppDispatch();

  const modalStatus = useSelector(modalWindowSelector);

  const createHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(switchModalWindow(!modalStatus));
  };

  return (
    <Wrapper className={className} {...props}>
      <main className="template__todo">
        <BtnDone color="default" description="Create" onClick={createHandler} />
        {children}
      </main>
    </Wrapper>
  );
};

export default Template;
