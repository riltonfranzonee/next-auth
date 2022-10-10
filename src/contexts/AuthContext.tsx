import { createContext, useEffect, useState } from "react";
import Router from "next/router";
import { setCookie, parseCookies } from "nookies";

import { retrieveUserInfo, signInRequest } from "../services/auth";
import api from "../services/api";

type User = {
  name: string;
  email: string;
  avatar: string;
};

type SignInInput = {
  email: string;
  password: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  signIn: (input: SignInInput) => Promise<void>;
  user: User;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { "next-auth.token": token } = parseCookies();

    if (token) {
      retrieveUserInfo().then((user) => {
        setUser(user);
      });
    }
  }, []);

  async function signIn({ email, password }: SignInInput) {
    const { token, user } = await signInRequest({ email, password });

    setCookie(undefined, "next-auth.token", token, {
      maxAge: 60 * 60 * 1, // 1 hour
    });

    api.defaults.headers["Authorization"] = `Bearer ${token}`;

    setUser(user);

    Router.push("/dashboard");
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
