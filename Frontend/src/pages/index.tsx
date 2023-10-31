import { Route, Routes, Navigate } from "react-router-dom";
import TodoTasks from "./TodoTasks/TodoTasks";
import Home from "./Home/Home";
import Account from "./Account/Account";
import Layout from "./Layout";
import AuthForm from "../processes/auth/AuthForm/AuthForm";
import AuthHocPrivat from "../processes/auth/Hoc/AuthHocPrivat";

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/account" element={<Account />} />
      <Route path="/account/register" element={<AuthForm />} />
      <Route path="/todos/*" element={<Layout />}>
        <Route
          index
          path="template"
          element={
            <AuthHocPrivat>
              <TodoTasks />
            </AuthHocPrivat>
          }
        />
      </Route>
      <Route />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
