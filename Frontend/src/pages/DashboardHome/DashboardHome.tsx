import { useSelector } from "react-redux";
import { selectUser } from "shared/api/user/userSelectors";
export type UserType = {
  id: string;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  is_verified: boolean;
  username: string;
};
const DashboardHome = () => {
  const user: UserType = useSelector(selectUser);
  return (
    <div className="mx-auto font-bold text-5xl ml-14 mt-10 flex flex-col gap-4">
      {`Добрый день💫`}
      <div className=" font-bold text-3xl border-b-2 border-yellow-300 w-fit">
        {user.username}
      </div>
    </div>
  );
};

export default DashboardHome;
