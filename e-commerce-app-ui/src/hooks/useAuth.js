import { createContext, useContext, useEffect, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { baseUrl } from "../components/Constants";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage(
    "isAuthenticated",
    false
  );
  const [jwtToken, setJwtToken] = useLocalStorage("jwtToken", null);
  const [user, setUser] = useLocalStorage("user", null);
  const [email, setEmail] = useLocalStorage("email", null);
  const [password, setPassword] = useLocalStorage("password", null);

  const login = () => {
    const credentials = { email: email, password: password };
    fetch(baseUrl + "/Users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((res) => {
        if (!res.ok) throw new Error(res.status);
        else {
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
        setJwtToken(data.token);
        setUser(data.user);
      })
      .catch((err) => {
        console.log(err);
      });

    setIsAuthenticated(true);
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    setJwtToken(null);
    setIsAuthenticated(false);
  };

  const value = useMemo(
    () => ({
      user,
      jwtToken,
      isAuthenticated,
      setEmail,
      setPassword,
      login,
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
