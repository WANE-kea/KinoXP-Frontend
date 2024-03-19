import { createContext, useState, ReactNode } from "react";
import { useContext } from "react";
import { authProvider, User } from "../services/authFacade";
import { SignUpResponse, SignUpRequest, LoginResponse, LoginRequest } from "../services/authFacade";

interface AuthContextType {
  username: string | null;
  signUp: (user: User) => Promise<SignUpResponse>;
  signIn: (user: User) => Promise<LoginResponse>;
  signOut: () => void;
  isLoggedIn: () => boolean;
  isLoggedInAs: (role: string[]) => boolean;
}

const AuthContext = createContext<AuthContextType>(null!);

export default function AuthProvider({ children }: { children: ReactNode }) {
  //We use this to distinguish between being logged in or not
  const initialUsername = localStorage.getItem("username") || null;
  const [username, setUsername] = useState<string | null>(initialUsername);

  const signUp = async (user_: SignUpRequest) => {
    return authProvider.signUp(user_).then((user) => {
      setUsername(user.username);
      localStorage.setItem("username", user.username);
      localStorage.setItem("roles", JSON.stringify(user.roles));
      localStorage.setItem("token", user.token);
      return user;
    });
  };

  const signIn = async (user_: LoginRequest) => {
    return authProvider.signIn(user_).then((user) => {
      setUsername(user.username);
      localStorage.setItem("username", user.username);
      localStorage.setItem("roles", JSON.stringify(user.roles));
      localStorage.setItem("token", user.token);
      return user;
    });
  };

  const signOut = () => {
    setUsername(null);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("roles");
  };

  function isLoggedIn() {
    return username != null;
  }

  function isLoggedInAs(role: string[]) {
    const roles: Array<string> = JSON.parse(localStorage.getItem("roles") || "[]");
    return roles?.some((r) => role.includes(r)) || false;
  }

  const value = { username, signUp, isLoggedIn, isLoggedInAs, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
