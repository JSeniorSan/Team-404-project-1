import { Editable, EditableInput, EditablePreview } from "@chakra-ui/react";

const EditableDiv = ({ text }: { text: string }) => {
  return (
    <Editable defaultValue={text} className=" flex flex-wrap text-lg">
      <EditablePreview />
      <EditableInput />
    </Editable>
  );
};

export default EditableDiv;
