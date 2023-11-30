import { useNavigate } from "react-router-dom";
import Logo from "shared/asset/Group 1.svg?react";
import "widgets/navPanel/index.scss";
const MainTitle = ({ title }: { title: string }) => {
  const navigate = useNavigate();
  const handleClickHome = () => {
    return navigate("/Home");
  };
  return (
    <div className="mainTitle" onClick={handleClickHome}>
      <Logo height={50} width={50} />
      {title}
    </div>
  );
};

export default MainTitle;
