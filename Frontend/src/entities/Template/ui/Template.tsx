import BtnAdd from "../../../shared/ui/btns/btn-add/Btn-add";
import Wrapper from "../../../shared/ui/wrapper/Wrapper";
import "./index.scss";

const Template = () => {
  return (
    <Wrapper className="template">
      <div className="template__todo">
        <BtnAdd />
      </div>
      <div className="template__progress">
        <BtnAdd />
      </div>
      <div className="template__done">
        <BtnAdd />
      </div>
    </Wrapper>
  );
};

export default Template;
