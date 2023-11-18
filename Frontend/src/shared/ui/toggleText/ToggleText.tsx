export interface IToggleText {
  text: string;
  setStatus: (value: boolean) => void;
  status: boolean;
}

const ToggleText: React.FC<IToggleText> = ({ text, setStatus, status }) => {
  const handleNewPanelClick = () => {
    setStatus(!status);
  };
  return (
    <div
      className="ml-12 text-xl cursor-pointer w-fit border p-4"
      onClick={handleNewPanelClick}
    >
      {text}
    </div>
  );
};

export default ToggleText;
