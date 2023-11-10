import { useLocation } from "react-router-dom";
import { IWorkspace } from "../../../shared/api/user/UserSlice";
import Page from "../../../shared/ui/p/Page";
import "./index.scss";
import BtnActivity from "../../../shared/ui/btns/btn-activity/BtnActivity";
import Star from "../../../shared/asset/star.svg?react";
import Flash from "../../../shared/asset/flash.svg?react";
import TwoUsers from "../../../shared/asset/profile-2userDark.svg?react";
import UserAvatar from "../../../shared/asset/Group 3.svg?react";

export interface IProps {
  kanbanData: IWorkspace;
}

const WorkspaceHeader: React.FC<IProps> = ({ ...props }) => {
  const location = useLocation();
  console.log(location.pathname);
  const pathArray = location.pathname.split("/")[2];

  return (
    <div className="p-12 flex flex-col">
      <Page color="gray" size="12px" weight="500">
        {`Workspace / ${props.kanbanData.name} / ${pathArray}`}
      </Page>
      <div className="flex justify-between mt-4">
        <Page color="black" size="40px" weight="700">
          {props.kanbanData.name}
        </Page>
        <div className="flex gap-2">
          <BtnActivity>
            <Flash />
          </BtnActivity>
          <BtnActivity>
            <Star />
          </BtnActivity>
          <BtnActivity>
            <TwoUsers />
            <Page color="black" size="14px" weight="600">
              Share
            </Page>
          </BtnActivity>
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
        <button className="border rounded-md p-3 px-4">
          <Page color="black" size="14px" weight="700">
            Only My
          </Page>
        </button>
      </div>
    </div>
  );
};

export default WorkspaceHeader;
