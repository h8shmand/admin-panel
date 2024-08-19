import axios from "axios";
import { createContext, useContext, useEffect } from "react";
import { useReducer } from "react";
import { useAuth } from "./AuthProvider";
const BASE_URL = "http://localhost:8008/api";
const UsersContext = createContext(null);
const usersInitialState = {
  users: [],
  isLoading: false,
  selectedUser: null,
  error: null,
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
  useEffect(() => {
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
    if (token) fetchUsers();
  }, [token]);

  async function getUser(id) {
    try {
      usersDispatch({ type: "loading" });
      const { data } = await axios.get(`${BASE_URL}/users/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      usersDispatch({ type: "user/loaded", payload: data });
    } catch (error) {
      //   toast.error(error.message);
    }
  }
  async function createUser(newUser) {
    try {
      usersDispatch({ type: "loading" });
      const { data } = await axios.post(`${BASE_URL}/users/register`, newUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      usersDispatch({ type: "user/created", payload: data });
    } catch (error) {
      //   toast.error(error.message);
    }
  }
  // async function updateUser(updatedUser, id) {
  //   try {
  //     usersDispatch({ type: "loading" });
  //     const res = await axios.put(`${BASE_URL}/users/${id}`, updatedUser, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     usersDispatch({type: "user/updated" })
  //   } catch (error) {}
  // }
  async function updateProfile(updatedProfile) {
    try {
      usersDispatch({ type: "loading" });
      const res = await axios.put(
        `${BASE_URL}/users/profile/${user.userId}`,
        updatedProfile,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {}
  }
  return (
    <UsersContext.Provider value={{ users, isLoading, selectedUser }}>
      {children}
    </UsersContext.Provider>
  );
}

export function useUsers() {
  return useContext(UsersContext);
}
