import { useLocation } from "react-router-dom";
import Page from "shared/ui/p/Page";
import "./index.scss";
import Star from "shared/asset/star.svg?react";
import Flash from "shared/asset/flash.svg?react";
import TwoUsers from "shared/asset/profile-2userDark.svg?react";
import UserAvatar from "shared/asset/Group 3.svg?react";
import Btn from "shared/ui/btns/Btn";

export interface IProps {
  kanbanDataName: string;
}

const PageTitle: React.FC<IProps> = ({ kanbanDataName }) => {
  const location = useLocation();
  const pathArray = location.pathname.split("/")[2];

  return (
    <div className="p-12 flex flex-col">
      <Page color="gray" size="12px" weight="500">
        {`Workspace / ${kanbanDataName} / ${pathArray}`}
      </Page>
      <div className="mt-4 flex flex-col md:flex-row md:justify-between ">
        <Page color="black" size="40px" weight="700">
          {kanbanDataName}
        </Page>
        <div className="flex gap-2">
          <Btn type="activity">
            <Flash />
          </Btn>
          <Btn type="activity">
            <Star />
          </Btn>
          <Btn type="activity">
            <TwoUsers />
            <Page color="black" size="14px" weight="600">
              Share
            </Page>
          </Btn>
        </div>
      </div>
      <div className="mt-4 flex gap-2 w-fit">
        <div className="flex ">
          <UserAvatar className="rounded-full border border-white" />
          <UserAvatar className="-translate-x-6 border border-white rounded-full" />
        </div>
        <div
          className="flex
        "
        >
          <UserAvatar className="rounded-full border border-white" />
          <UserAvatar className="-translate-x-6 border border-white rounded-full" />
        </div>
        <Btn type="activity">
          <Page color="black" size="14px" weight="700">
            Only My
          </Page>
        </Btn>
      </div>
    </div>
  );
};

export default PageTitle;
