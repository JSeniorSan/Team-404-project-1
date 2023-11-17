import Page from "shared/ui/p/Page";

const Status = ({ status }: { status: string }) => {
  return (
    <Page color="black" size="16px" weight="500">
      {status}
    </Page>
  );
};

export default Status;
