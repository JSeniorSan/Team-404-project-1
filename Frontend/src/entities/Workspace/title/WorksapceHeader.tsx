import { useLocation } from "react-router-dom";
import { IWorkspace } from "../../../shared/api/user/UserSlice";
import Page from "../../../shared/ui/p/Page";
import "./index.scss";
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
        <div>Activity</div>
      </div>
      <div className="mt-4">users + btn</div>
    </div>
  );
};

export default WorkspaceHeader;
