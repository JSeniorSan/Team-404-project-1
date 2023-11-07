import Page from "../p/Page";

export interface ITag {
  count: number;
}

const Tag: React.FC<ITag> = ({ count }) => {
  return (
    <div className="flex justify-center items-center p-1 rounded-full border-gray-300 bg-slate-100">
      <Page color="gray" size="12px" weight="700">
        {count}
      </Page>
    </div>
  );
};

export default Tag;
