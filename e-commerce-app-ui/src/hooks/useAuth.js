import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage(
    "isAuthenticated",
    false
  );
  const [jwtToken, setJwtToken] = useLocalStorage("jwtToken", null);
  const [user, setUser] = useLocalStorage("user", null);

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    setJwtToken(null);
    setIsAuthenticated(false);
  };

  const value = useMemo(
    () => ({
      user,
      setUser,
      jwtToken,
      setJwtToken,
      isAuthenticated,
      setIsAuthenticated,
      logout,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isAuthenticated]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
