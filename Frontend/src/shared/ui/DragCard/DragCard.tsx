import Page from "../p/Page";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface IDragCard
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title: string;
  description: string;
  elemId: number;
}

const DragCard: React.FC<IDragCard> = ({
  title,
  description,
  elemId,
  ...props
}) => {
  return (
    <div
      className="w-14 h-16 p-3 border rounded-md flex flex-col gap-2"
      {...props}
    >
      <Page color="gray" size="16px" weight="600">
        {title}
      </Page>
      <Page color="gray" size="14px" weight="400">
        {description}
      </Page>
      <div className="flex justify-between">
        <div>Comments</div>
      </div>
    </div>
  );
};

export default DragCard;
