import { lazy } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

const TestPage = lazy(() => import("./test/index"));

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<TestPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
