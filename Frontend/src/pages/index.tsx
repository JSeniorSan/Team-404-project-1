import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./Home/Home";
import Account from "./Account/Account";
import Layout from "./Layout";
import AuthForm from "../processes/auth/AuthForm/AuthForm";
import AuthHocPrivat from "../processes/auth/Hoc/AuthHocPrivat";
import TodosPageList from "./TodoPages/TodosPageList/TodosPageList";
import DashboardHome from "./DashboardHome/DashboardHome";

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/account" element={<Account />} />
      <Route path="/account/register" element={<AuthForm />} />

      <Route path="/dashboard/*" element={<Layout />}>
        <Route path={"home"} element={<DashboardHome />} />
        <Route
          path="list/*"
          element={
            <AuthHocPrivat>
              <TodosPageList />
            </AuthHocPrivat>
          }
        >
          <Route
            path=":workspaceName"
            element={
              <AuthHocPrivat>
                <TodosPageList />
              </AuthHocPrivat>
            }
          />
        </Route>
        <Route
          path="kanban/"
          element={
            <AuthHocPrivat>
              <TodosPageList />
            </AuthHocPrivat>
          }
        >
          <Route path=":workspaceName" element={<TodosPageList />} />
        </Route>
        <Route
          path="calendar"
          element={
            <AuthHocPrivat>
              <Home />
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
