import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ITemplateType
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const Template: React.FC<ITemplateType> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={className} {...props}>
      <main className="h-fit w-full flex flex-col gap-5">{children}</main>
    </div>
  );
};

export default Template;
