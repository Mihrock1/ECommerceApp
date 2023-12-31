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

  const logout = () => {
    setUser(null);
    setJwtToken(null);
    setIsAuthenticated(false);
    alert("You have been logged out.");
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
