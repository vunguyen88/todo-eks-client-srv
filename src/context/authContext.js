// Auth context using disspatch and session storage for user auth

import { createContext, useEffect, useReducer } from "react";
import { authReducer } from "../reducers/authReducer";

const initialAuth = null;

const AuthContext = createContext({
  auth: initialAuth,
});

export function AuthContextProvider(props) {
  const [auth, dispatch] = useReducer(authReducer, initialAuth, () => {
    const sessionData = typeof window !== "undefined" ? sessionStorage.getItem("auth") : null;
    return sessionData && typeof window !== "undefined" ? JSON.parse(sessionData) : null
  });

  useEffect(() => {
    sessionStorage.setItem("auth", JSON.stringify(auth))
  }, [auth])

  const context = { auth, dispatch }

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  )
}
export default AuthContext;