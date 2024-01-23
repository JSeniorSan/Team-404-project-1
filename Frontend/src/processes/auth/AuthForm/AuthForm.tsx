import { SubmitHandler, useForm } from "react-hook-form";
import useRegister from "shared/hooks/useRegister";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { todoApi } from "shared/api/todoQueryApi/TodoServise";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import AuthBg from "../ui/AuthBg";

export interface IAuth {
  username: string;
  password: string;
  email: string;
}

const AuthForm = () => {
  const { isSucessRegister, status } = useRegister();
  const [createAuth, { isSuccess }] = todoApi.useRegistrationUserMutation();
  useEffect(() => {
    isSucessRegister(isSuccess);
  }, [isSuccess, isSucessRegister]);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<IAuth>();

  const onSubmit: SubmitHandler<IAuth> = async (data) => {
    await createAuth(data);
  };

  return (
    <AuthBg>
      <Link to="/account" className="p-5 underline text-5xl font-bold ">
        <div className="bg-blue-200 absolute ml-5 mt-10 rounded-full hover:-translate-x-4 transition-all animate-pulse">
          <ArrowBackIcon fontSize={100} color="white" />
        </div>
      </Link>

      <div className="flex justify-center items-center h-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-96 flex-col  gap-3 p-10 bg-slate-800 rounded-lg backdrop-blur-md bg-opacity-90"
        >
          <div className="text-5xl font-bold mb-5 bg-blue-400 p-4 rounded text-white flex justify-center">
            Sign Up
          </div>
          <FormControl isRequired>
            <FormLabel color="white">Email</FormLabel>
            {status && <div className="text-red-500">{status}</div>}
            <Input
              id="email"
              placeholder="email..."
              color="white"
              {...register("email")}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel color="white">Username</FormLabel>
            <Input
              id="username"
              placeholder="username..."
              color="white"
              {...register("username")}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel color="white">Password</FormLabel>
            <Input
              id="password"
              placeholder="your password..."
              color="white"
              {...register("password")}
            />
          </FormControl>

          <Button colorScheme="blue" isLoading={isSubmitting} type="submit">
            Save
          </Button>
        </form>
      </div>
    </AuthBg>
  );
};

export default AuthForm;
