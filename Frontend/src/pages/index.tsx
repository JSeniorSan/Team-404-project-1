import { Route, Routes, Navigate } from "react-router-dom";
import TodoTasks from "./TodoTasks/TodoTasks";

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<TodoTasks />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
