import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, loginUser } from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    const res = await loginUser({ email, password });

    localStorage.setItem("token", res.data.access_token);
    localStorage.setItem("role", res.data.role);

    await loadUser();

    return res.data;
  };

  const loadUser = async () => {
    try {
      const res = await getCurrentUser();
      setUser(res.data);
    } catch {
      setUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
    window.location.href = "/login";
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);