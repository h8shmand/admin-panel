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
const AuthContext = createContext();

const authInitialState = {
  user: null,
  isAuthenticated: false,
  token: "",
};
function authReducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        user: action.payload,
        isAuthenticated: true,
        token: action.payload.accessToken,
      };
    case "loadData":
      return {
        user: action.payload().user,
        isAuthenticated: action.payload().isAuthenticated,
        token: action.payload().token,
      };
    case "logout":
      return {
        user: null,
        isAuthenticated: false,
        token: "",
      };
    default:
      throw new Error("unknown action has been taken!");
  }
}

export default function AuthProvider({ children }) {
  const [{ user, isAuthenticated, token }, authDispatch] = useReducer(
    authReducer,
    authInitialState
  );
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated || Cookies.get("userInfos"))
      authDispatch({ type: "loadData", payload: getCookies });
  }, []);
  function setCookies(res) {
    Cookies.set(
      "userInfos",
      JSON.stringify({
        user: res.data.data,
        isAuthenticated: true,
        token: res.data.data.accessToken,
      }),
      {
        expires: 1,
        secure: true,
      }
    );
  }
  function removeCookies() {
    Cookies.remove("userInfos");
  }
  function getCookies() {
    return JSON.parse(Cookies.get("userInfos"));
  }
  async function login(values) {
    try {
      setIsLoading(true);
      const res = await axios.post(
        "http://localhost:8008/api/users/login",
        values
      );
      if (res) {
        setCookies(res);
        authDispatch({ type: "login", payload: res.data.data });
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
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
        user,
        isAuthenticated,
        token,
        isLoading,
        login,
        logout,
        getCookies,
        removeCookies,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
