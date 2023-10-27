import { Route, Routes, Navigate } from "react-router-dom";
import TodoTasks from "./TodoTasks/TodoTasks";
import Home from "./Home/Home";
import Account from "./Account/Account";

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/todo" element={<TodoTasks />} />
      <Route path="/account" element={<Account />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
