// import UserMenu from "features/UserMenu/UserMenu";
import { useState } from "react";
import InputLeftElem from "shared/ui/input/addons/InputLeftElem";
import Glass from "shared/asset/search-normal.svg?react";
import Message from "shared/asset/Chat.svg?react";
import Notification from "shared/asset/notification.svg?react";
import UserIcon from "shared/asset/Group 3.svg?react";
import UserMenu from "shared/ui/miniMenu/addons/UserMenu/UserMenu";

const RightHeaderItems = () => {
  const [userMenu, setUserMenu] = useState<boolean>(false);
  const handleUserMenu = () => {
    setUserMenu(!userMenu);
  };
  return (
    <div className="flex gap-4 items-center">
      <InputLeftElem placeholder="Search..." type="search" elem={<Glass />} />
      <span>
        <Message />
      </span>
      <span>
        <Notification />
      </span>
      <span className="relative cursor-pointer">
        <UserIcon
          onClick={handleUserMenu}
          className="hover:border-indigo-400 border rounded-full hover:scale-125"
        />
        <UserMenu menu={userMenu} />
      </span>
    </div>
  );
};

export default RightHeaderItems;
