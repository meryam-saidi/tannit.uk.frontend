// src/routes/PrivateRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function PrivateRoute() {
  const isAuthenticated = useSelector((s: RootState) => !!s.auth.token);
  return isAuthenticated ? <Outlet /> : <Navigate to="/loginPage" replace />;
}
