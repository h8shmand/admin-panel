import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  function removeCookies() {
    Cookies.remove("userInfo");
  }

  async function login(values) {
    try {
      setIsLoading(true);
      const res = await axios.post(
        "http://localhost:8008/api/users/login",
        values
      );
      if (res) {
        Cookies.set(
          "userInfo",
          JSON.stringify({ ...res.data.data, isAuthenticated: true }),
          {
            expires: 1,
            secure: true,
            sameSite: "Strict",
          }
        );
        setIsAuthenticated(true);
        navigate("/dashboard");
        toast.success(res.data.data.message, {
          position: "top-center",
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
          draggable: true,
          theme: localStorage.getItem("darkMode") === "true" ? "dark" : "light",
          transition: Slide,
          rtl: true,
        });
      }
    } catch (error) {
      toast.error(error.response.data.messages[0].message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        draggable: true,
        theme: localStorage.getItem("darkMode") === "true" ? "dark" : "light",
        transition: Slide,
        rtl: true,
      });
    } finally {
      setIsLoading(false);
    }
  }
  function logout() {
    authDispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider
      value={{
        isLoading,
        login,
        logout,
        removeCookies,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
