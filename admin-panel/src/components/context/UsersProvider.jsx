import axios from "axios";
import { createContext, useContext, useEffect } from "react";
import { useReducer } from "react";
import { useAuth } from "./AuthProvider";
import { Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BASE_URL = "http://localhost:8008/api";
const UsersContext = createContext(null);
const usersInitialState = {
  users: [],
  isLoading: false,
  selectedUser: "",
  error: "",
};

function usersReducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "users/loaded":
      return {
        ...state,
        isLoading: false,
        users: action.payload,
      };
    case "user/loaded":
      return {
        ...state,
        isLoading: false,
        selectedUser: action.payload,
      };
    case "user/created":
      return {
        ...state,
        isLoading: false,
        users: [...state.users, action.payload],
      };
    case "user/deleted":
      return {
        ...state,
        isLoading: false,
        users: state.users.filter((item) => item.id !== action.payload),
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "discardSelected":
      return {
        ...state,
        isLoading: false,
        selectedUser: "",
      };
    default:
      throw new Error("Action Not Available!");
  }
}

export default function UsersProvider({ children }) {
  const [{ users, isLoading, selectedUser, error }, usersDispatch] = useReducer(
    usersReducer,
    usersInitialState
  );
  const { user, token } = useAuth();
  async function fetchUsers() {
    try {
      usersDispatch({ type: "loading" });
      const { data } = await axios.get(`${BASE_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      usersDispatch({ type: "users/loaded", payload: data.data });
    } catch (error) {
      usersDispatch({ type: "users/loaded", payload: [] });
      usersDispatch({ type: "rejected", payload: error });
      console.log(error);
    }
  }
  useEffect(() => {
    if (token) fetchUsers();
  }, [token]);

  async function getUser(id) {
    try {
      usersDispatch({ type: "loading" });
      const { data } = await axios.get(`${BASE_URL}/users/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      usersDispatch({ type: "user/loaded", payload: data.data });
    } catch (error) {
      toast.error(error.response.data.messages[0].message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        draggable: true,
        theme: "light",
        transition: Slide,
        rtl: true,
      });
    }
  }
  async function createUser(newUser) {
    const req = {
      fullName: newUser.fullName,
      email: newUser.email,
      password: newUser.password,
      confPassword: newUser.confPassword,
      isAdmin: Number(newUser.role),
    };
    try {
      usersDispatch({ type: "loading" });
      const { data } = await axios.post(`${BASE_URL}/users/register`, req, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
      usersDispatch({ type: "user/created", payload: data });
    } catch (error) {
      toast.error(error.response.data.messages[0].message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        draggable: true,
        theme: "light",
        transition: Slide,
        rtl: true,
      });
    }
  }
  async function updateUser(updatedUser, id) {
    try {
      usersDispatch({ type: "loading" });
      const res = await axios.put(`${BASE_URL}/users/${id}`, updatedUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
      toast.success(res.data.message, {
        position: "top-center",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        draggable: true,
        theme: "light",
        transition: Slide,
        rtl: true,
      });
    } catch (error) {
      toast.error(error.response.data.messages[0].message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        draggable: true,
        theme: "light",
        transition: Slide,
        rtl: true,
      });
    }
  }
  async function updateProfile(updatedProfile, id) {
    const formData = new FormData();
    formData.append("fullName", updatedProfile.fullName);
    formData.append("password", updatedProfile.password);
    formData.append("confPassword", user.confPassword);
    formData.append("file", updatedProfile.image);

    try {
      usersDispatch({ type: "loading" });
      const res = await axios.put(
        `${BASE_URL}/users/profile/${id}`,
        updatedProfile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(res.data.message, {
        position: "top-center",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        draggable: true,
        theme: "light",
        transition: Slide,
        rtl: true,
      });
    } catch (error) {
      toast.error(error.response.data.messages[0].message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        draggable: true,
        theme: "light",
        transition: Slide,
        rtl: true,
      });
    }
  }
  function discardSelectedUser() {
    usersDispatch({ type: "discardSelected" });
  }
  return (
    <UsersContext.Provider
      value={{
        users,
        isLoading,
        selectedUser,
        createUser,
        getUser,
        updateUser,
        discardSelectedUser,
        updateProfile,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}

export function useUsers() {
  return useContext(UsersContext);
}
