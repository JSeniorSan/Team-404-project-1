import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "shared/api/redux-hooks";
import { todoApi } from "shared/api/todoQueryApi/TodoServise";
import { saveUser } from "shared/api/user/UserSlice";

const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isSuccess: done }] = todoApi.useLoginMutation();

  const [getMe, { data: meData }] = todoApi.useLazyGetMeQuery();

  useEffect(() => {
    if (done && meData) {
      dispatch(saveUser(meData));
      navigate("/dashboard/home", { replace: true });
    }
  }, [dispatch, navigate, done, getMe, meData]);

  return { login, getMe };
};

export default useLogin;
