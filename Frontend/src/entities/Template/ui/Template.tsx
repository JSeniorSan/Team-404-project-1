import { forwardRef } from "@chakra-ui/react";
import { DetailedHTMLProps, HTMLAttributes } from "react";
export interface ITemplateType
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const Template: React.FC<ITemplateType> = forwardRef(
  ({ className, children, ...props }, ref) => {
    return (
      <div className={className} ref={ref} {...props}>
        <main className="h-fit w-full flex flex-col gap-5">{children}</main>
      </div>
    );
  }
);

export default Template;
