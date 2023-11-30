import { HexColorPicker } from "react-colorful";

export interface IHex {
  color: string;
  setColor: (value: string) => void;
}

const HexColor: React.FC<IHex> = ({ color, setColor }) => {
  return <HexColorPicker color={color} onChange={setColor} />;
};

export default HexColor;
