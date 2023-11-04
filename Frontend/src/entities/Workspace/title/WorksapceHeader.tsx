import Page from "../../../shared/ui/p/Page";
import "./index.scss";

const WorksapceHeader = () => {
  return (
    <div className="p-12 flex flex-col">
      <Page color="gray" size="12px" weight="500">
        Workspace / Hikoko Design / Board
      </Page>
      <div className="flex justify-between mt-4">
        <Page color="black" size="40px" weight="700">
          Title
        </Page>
        <div>Activity</div>
      </div>
      <div className="mt-4">users + btn</div>
    </div>
  );
};

export default WorksapceHeader;
