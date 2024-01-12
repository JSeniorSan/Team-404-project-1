import { SubmitHandler, useForm } from "react-hook-form";
import useRegister from "shared/hooks/useRegister";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { todoApi } from "shared/api/todoQueryApi/TodoServise";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export interface IAuth {
  username: string;
  password: string;
  email: string;
}

const AuthForm = () => {
  const { isSucessRegister, status } = useRegister();

  const [createAuth, { isLoading }] = todoApi.useRegistrationUserMutation();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<IAuth>();

  const onSubmit: SubmitHandler<IAuth> = async (data) => {
    console.log("data", data);

    await createAuth(data);

    isSucessRegister(isLoading);
  };

  return (
    <div className="bg-gray-600 ">
      <div className="bg-blue-300 absolute top-16 right-5  rounded-full w-20 h-20 animate-[bounce_3s_infinite]"></div>
      <div className="bg-green-300 absolute top-96   right-28 rounded-full w-40 h-40 animate-[bounce_2s_infinite] "></div>
      <div className="bg-yellow-300 absolute  top-56 left-96 rounded-full w-[300px] h-[200px] -rotate-45"></div>
      <div className="bg-pink-300 opacity-80  absolute top-[700px] left-24 rounded-full w-32 h-32 animate-[bounce_4s_infinite] "></div>

      <Link to="/account" className="p-5 underline text-5xl font-bold ">
        <div className="bg-blue-200 absolute ml-5 mt-10 rounded-full hover:-translate-x-4 transition-all animate-pulse">
          <ArrowBackIcon fontSize={100} color="white" />
        </div>
      </Link>

      <div className="flex justify-center items-center h-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-96 flex-col gap-3 p-10 bg-slate-800 rounded-lg backdrop-blur-md bg-opacity-90"
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
    </div>
  );
};

export default AuthForm;
