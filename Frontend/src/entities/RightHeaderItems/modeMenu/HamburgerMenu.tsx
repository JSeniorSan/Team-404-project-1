import { HamburgerIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { data } from "entities/LeftHeaderItems/LeftHeaderItems.data";
import { Link } from "react-router-dom";

const HamburgerMenu = () => {
  return (
    <div className="lg:hidden">
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          variant="outline"
        />
        <MenuList>
          {data.map((elem) => {
            return (
              <Link to={elem.path} key={elem.title}>
                <MenuItem icon={elem.svg}>{elem.title}</MenuItem>
              </Link>
            );
          })}
        </MenuList>
      </Menu>
    </div>
  );
};

export default HamburgerMenu;
