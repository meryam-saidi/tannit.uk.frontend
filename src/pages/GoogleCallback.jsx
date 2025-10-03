import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setToken } from '../store/authSlice'; 

export default function GoogleCallback() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const processedRef = useRef(false); // empêche le double-traitement (StrictMode)

  useEffect(() => {
    if (processedRef.current) return;
    processedRef.current = true;

    //token en fragment (#token=...) ou en query (?token=...)
    const hash = new URLSearchParams(window.location.hash.slice(1));
    const query = new URLSearchParams(window.location.search);

    const token = hash.get("token") || query.get("token");
    const isNew = (hash.get("new") || query.get("new")) === "1";

    console.log("AccessToken après google callback :", token);

    if (token) {
      // 1) Stocker le token Redux
      dispatch(setToken(token));
      
      // 2) Nettoyer l’URL (retirer #token=... / ?token=...)
      const cleanUrl = window.location.origin + "/GoogleCallback";
      window.history.replaceState({}, document.title, cleanUrl);

      // 3) Rediriger ves profileCreatedPage si l'email n'est pas utilisé sinon vers dashboard direct
      //navigate("/ProfileCreatedPage", { replace: true });
      navigate(isNew ? "/ProfileCreatedPage" : "/dashboard", { replace: true });
    } else {
      navigate("/loginPage", { replace: true });
    }
  }, [navigate]);

  return <div>Signing you in…</div>;
}
