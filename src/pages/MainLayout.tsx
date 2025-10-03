// src/layouts/MainLayout.tsx
import { Outlet } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import { useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { fetchAccountMe } from "../store/accountSlice";

export default function MainLayout() {
  const dispatch = useAppDispatch();
  const token = useSelector((s: RootState) => s.auth.token);

  useEffect(() => {
    if (token) {
      // hydrate le solde/email une fois connecté
      // @ts-ignore si besoin selon ta config
      dispatch(fetchAccountMe());
    }
  }, [token, dispatch]);

  return (
    <div className="app-container">
      <AppHeader />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
