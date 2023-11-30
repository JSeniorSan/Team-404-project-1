import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./Home/Home";
import Account from "./Account/Account";
import Layout from "./Layout";
import AuthForm from "processes/auth/AuthForm/AuthForm";
import AuthHocPrivat from "processes/auth/Hoc/AuthHocPrivat";
import TodosPageList from "./TodoPages/TodosPage";
import DashboardHome from "./DashboardHome/DashboardHome";
import TodosPage from "./TodoPages/TodosPage";

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/account" element={<Account />} />
      <Route path="/account/register" element={<AuthForm />} />
      <Route path="/dashboard/*" element={<Layout />}>
        <Route
          path="home"
          element={
            <AuthHocPrivat>
              <DashboardHome />
            </AuthHocPrivat>
          }
        />
        <Route
          path="list/*"
          element={
            <AuthHocPrivat>
              <TodosPage />
            </AuthHocPrivat>
          }
        >
          <Route
            path=":workspaceName"
            element={
              <AuthHocPrivat>
                <TodosPage />
              </AuthHocPrivat>
            }
          />
        </Route>
        <Route
          path="kanban/"
          element={
            <AuthHocPrivat>
              <TodosPage />
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
      <Route />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
