import { useEffect } from "react";
import userManager from "../auth/authService";

const Logout = () => {
  useEffect(() => {
    userManager.signoutRedirect();
  }, []);

  return <p>Déconnexion...</p>;
};

export default Logout;
