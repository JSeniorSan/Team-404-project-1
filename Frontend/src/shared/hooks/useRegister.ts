import { useState } from "react";
import { useNavigate } from "react-router-dom";

export interface IRegisterHook {
  status: string;
  isSucessRegister: (val: boolean) => void;
}

const useRegister = (): IRegisterHook => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<string>("");

  const isSucessRegister = (value: boolean) => {
    if (value) {
      console.log("registration");

      navigate("/account");
      setStatus("");
    } else {
      setStatus("");
    }
  };

  return { isSucessRegister, status };
};

export default useRegister;
