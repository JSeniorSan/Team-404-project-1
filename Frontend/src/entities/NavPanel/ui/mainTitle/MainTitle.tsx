import { useNavigate } from "react-router-dom";
import Logo from "../../../../shared/asset/Group 1.svg?react";
import "../index.scss";
const MainTitle = () => {
  const navigate = useNavigate();
  const handleClickHome = () => {
    return navigate("/Home");
  };
  return (
    <div className="mainTitle" onClick={handleClickHome}>
      <Logo height={50} width={50} />
      Kanban
    </div>
  );
};

export default MainTitle;
