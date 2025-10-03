// src/auth/AuthProvider.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { User, UserManager } from "oidc-client-ts";
import userManager from "./authService";

type AuthContextType = {
  user: User | null;
};

const AuthContext = createContext<AuthContextType>({ user: null });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Récupère l'utilisateur depuis le localStorage (si connecté)
    userManager.getUser().then((user) => {
      setUser(user);
    });

    // Écoute les événements de connexion/déconnexion
    const onUserLoaded = (user: User) => setUser(user);
    const onUserUnloaded = () => setUser(null);

    userManager.events.addUserLoaded(onUserLoaded);
    userManager.events.addUserUnloaded(onUserUnloaded);

    return () => {
      userManager.events.removeUserLoaded(onUserLoaded);
      userManager.events.removeUserUnloaded(onUserUnloaded);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
