// // import { useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { useAppDispatch } from "shared/hooks/redux-hooks";
// import { todoApi } from "shared/api/todoQueryApi/TodoServise";
// // import { saveUser } from "shared/api/user/UserSlice";

// const useLogin = () => {
//   // const navigate = useNavigate();
//   // const dispatch = useAppDispatch();
//   // const [
//   //   login,
//   //   { isSuccess: done, isError: errorLogin, data: userInfoResponse },
//   // ] = todoApi.useLoginMutation();
//   const [getMe, { data: meData, isError: errorMe }] =
//     todoApi.useLazyGetMeQuery();

//   // useEffect(() => {
//   //   if (done && meData) {
//   //     dispatch(saveUser(meData));
//   //     navigate("/dashboard/home", { replace: true });
//   //   }
//   // }, [dispatch, navigate, done, getMe, meData]);

//   return { getMe, errorMe, meData };
// };

// export default useLogin;
