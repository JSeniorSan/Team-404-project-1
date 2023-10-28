import { Route, Routes, Navigate } from "react-router-dom";
import TodoTasks from "./TodoTasks/TodoTasks";
import Home from "./Home/Home";
import Account from "./Account/Account";
import Layout from "./Layout";
import AuthForm from "../processes/auth/AuthForm/AuthForm";

export const Routing = () => {
  return (
    <Routes>
      <Route path="/todo" element={<Layout />}>
        <Route index path="home" element={<Home />} />
        <Route index path="template" element={<TodoTasks />} />
        <Route />
      </Route>

      {/* <Route path="/todo" element={<Layout />}>
        <Route path="workspace/:title/board" element={<TodosList />} />
        <Route path="workspace/:title/list" element={<TodoTasks />} />
        <Route path="home" element={<TodoHome />} />
        <Route path="my" element={<MyTask></MyTask>} />
        <Route path="goals" element={<Goals />} />
        <Route path="members" element={<Members />} />
      </Route> */}

      <Route path="/account" element={<Account />} />
      <Route path="/account/register" element={<AuthForm />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
