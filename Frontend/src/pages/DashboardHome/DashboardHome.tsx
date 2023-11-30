import { useSelector } from "react-redux";
import { selectUser } from "shared/api/user/userSelectors";

const DashboardHome = () => {
  const userName = useSelector(selectUser);

  return (
    <div className="mx-auto font-bold text-5xl">{`Добрый день, ${userName.username}`}</div>
  );
};

export default DashboardHome;
