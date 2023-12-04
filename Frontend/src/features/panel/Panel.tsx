import { useState } from "react";
import Dots from "shared/asset/tabler_dots.svg?react";
import Page from "shared/ui/p/Page";
import Tag from "shared/ui/tag/Tag";
import PanelModalCard from "entities/PanelModalCard/PanelModalCard";

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

  return (
    <div className={className} onMouseLeave={handleLeaveMouse} {...props}>
      <div className="flex gap-2 items-center">
        <Page color="black" size="14px" weight="700">
          {textFormater(panelTitle)}
        </Page>
        <Tag count={todosCount} />
      </div>
      <Dots onClick={handleDotsClick} className="cursor-pointer" />
      <PanelModalCard menu={menu} panelId={panelId} />
    </div>
  );

  function handleDotsClick() {
    setMenu(!menu);
  }

  function handleLeaveMouse() {
    setMenu(false);
  }

  function textFormater(text: string): string {
    return text.toUpperCase();
  }
};

export default Panel;
