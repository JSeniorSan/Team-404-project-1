// import { useSortable } from "@dnd-kit/sortable";
import { DetailedHTMLProps, HTMLAttributes } from "react";
// import { CSS } from "@dnd-kit/utilities";
export interface ITemplateType
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  // panelId: number;
}

const Template: React.FC<ITemplateType> = ({
  className,
  children,
  // panelId,
  ...props
}) => {
  // const { setNodeRef, attributes, listeners, transform, transition } =
  //   useSortable({
  //     id: panelId,
  //   });

  // const style = {
  //   transition,
  //   transform: CSS.Transform.toString(transform),
  // };

  return (
    <div
      className={className}
      {...props}
      // ref={setNodeRef}
      // style={style}
      // {...listeners}
      // {...attributes}
    >
      <main className="h-fit w-full flex flex-col gap-5">{children}</main>
    </div>
  );
};

export default Template;
