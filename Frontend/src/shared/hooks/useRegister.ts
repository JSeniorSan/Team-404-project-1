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
      navigate("/account");
      setStatus("");
    } else {
      setStatus("Форма ввода заполнена не корректно");
    }
  };

  return { isSucessRegister, status };
};

export default useRegister;
