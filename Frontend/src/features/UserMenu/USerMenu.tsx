import Page from "../../shared/ui/p/Page";
import cn from "classnames";
import "./index.scss";

import { useAppDispatch } from "../../shared/api/redux-hooks";
import { useSelector } from "react-redux";
import { selectUser } from "../../shared/api/user/userSelectors";
import { todoApi } from "../../shared/api/todoQueryApi/TodoServise";
import { deleteCurrentUser } from "../../shared/api/user/UserSlice";
import { useNavigate } from "react-router-dom";

export interface IUserMenu {
  menu: boolean;
}

const UserMenu: React.FC<IUserMenu> = ({ menu }) => {
  const dispatch = useAppDispatch();
  const currentUser = useSelector(selectUser);
  const navigate = useNavigate();

  const user = {
    id: "",
    ...currentUser,
  };

  const [deleteMeById] = todoApi.useDeleteMeByIdMutation();

  const [logout] = todoApi.useLogoutMutation();

  const onClick = async () => {
    if (Object.keys(currentUser).length) {
      await deleteMeById(user.id);
    }
    await logout(null);
    dispatch(deleteCurrentUser());
    navigate("/account");
  };

  return (
    <div
      className={cn("userMenu", {
        ["activeUserMenu"]: menu,
      })}
    >
      <Page color="white" size="14px" weight="500" onClick={onClick}>
        Exit
      </Page>
    </div>
  );
};

export default UserMenu;
