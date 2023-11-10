import { DetailedHTMLProps, HTMLAttributes } from "react";
export interface IActivity
  extends DetailedHTMLProps<HTMLAttributes<SVGElement>, SVGElement> {}

const BtnActivity: React.FC<IActivity> = ({ children }) => {
  return (
    <button className="flex items-center justify-center rounded-md gap-2 border p-2 py-0">
      {children}
    </button>
  );
};

export default BtnActivity;
