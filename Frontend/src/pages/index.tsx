import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./Home/Home";
import Account from "./Account/Account";
import Layout from "./Layout";
import AuthForm from "../processes/auth/AuthForm/AuthForm";
import AuthHocPrivat from "../processes/auth/Hoc/AuthHocPrivat";
import TodosList from "../widgets/todosList/TodosList";
import TodosPageList from "./TodoPages/TodosPageList/TodosPageList";

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/account" element={<Account />} />
      <Route path="/account/register" element={<AuthForm />} />
      <Route path="/dashboard/todos/*" element={<Layout />}>
        <Route
          index
          path="list"
          element={
            <AuthHocPrivat>
              <TodosPageList />
            </AuthHocPrivat>
          }
        />
        <Route
          path="kanban"
          element={
            <AuthHocPrivat>
              <Home />
            </AuthHocPrivat>
          }
        />
        <Route
          path="calendar"
          element={
            <AuthHocPrivat>
              <TodosList />
            </AuthHocPrivat>
          }
        />
      </Route>
      <Route path="/dashboard/*">
        <Route path="home" />
        <Route path="my_tasks" />
        <Route path="goals" />
        <Route path="members" />
      </Route>
      <Route />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
