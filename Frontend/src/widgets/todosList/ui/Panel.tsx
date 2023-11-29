import { useState } from "react";
import PanelFeaturesCard from "features/PanelFeatures/PanelFeatures";
import Dots from "shared/asset/tabler_dots.svg?react";
import Page from "shared/ui/p/Page";
import Tag from "shared/ui/tag/Tag";

export interface ITaksTitle {
  panelTitle: string;
  todosCount: number;
  panelId: number;
  className: string;
}

const Panel: React.FC<ITaksTitle> = ({
  className,
  panelTitle,
  todosCount,
  panelId,
  ...props
}) => {
  const [menu, setMenu] = useState<boolean>(false);

  const handleDotsClick = () => {
    setMenu(!menu);
  };

  const handleLeaveMouse = () => {
    setMenu(false);
  };

  return (
    <div className={className} onMouseLeave={handleLeaveMouse} {...props}>
      <div className="flex gap-2 items-center">
        <Page color="black" size="14px" weight="700">
          {panelTitle}
        </Page>

        <Tag count={todosCount} />
      </div>
      <Dots onClick={handleDotsClick} className="cursor-pointer" />
      <PanelFeaturesCard menu={menu} panelId={panelId} />
    </div>
  );
};

export default Panel;
