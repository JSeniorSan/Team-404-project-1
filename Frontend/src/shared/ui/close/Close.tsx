import { CloseButton, Stack } from "@chakra-ui/react";

const Close = ({ onClick }: { onClick: () => void }) => {
  return (
    <Stack
      direction="row"
      spacing={6}
      onClick={onClick}
      color={"GrayText"}
      className="absolute top-0 right-0"
    >
      <CloseButton size="lg" />
    </Stack>
  );
};

export default Close;
