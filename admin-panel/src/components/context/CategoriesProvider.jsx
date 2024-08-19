import axios from "axios";
import { createContext, useContext, useEffect } from "react";
import { useReducer } from "react";
import { useAuth } from "./AuthProvider";
const BASE_URL = "http://localhost:8008/api";
const CategoriesContext = createContext(null);
const categoriesInitialState = {
  categories: [],
  isLoading: false,
  selectedCategory: null,
  error: null,
};

function categoriesReducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "categories/loaded":
      return {
        ...state,
        isLoading: false,
        categories: action.payload,
      };
    case "category/loaded":
      return {
        ...state,
        isLoading: false,
        selectedCategory: action.payload,
      };
    case "category/created":
      return {
        ...state,
        isLoading: false,
        categories: [...state.categories, action.payload],
      };
    case "category/deleted":
      return {
        ...state,
        isLoading: false,
        categories: state.categories.filter(
          (item) => item.id !== action.payload
        ),
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

export default function CategoriesProvider({ children }) {
  const [
    { categories, isLoading, selectedCategory, error },
    categoriesDispatch,
  ] = useReducer(categoriesReducer, categoriesInitialState);
  const { token } = useAuth();
  useEffect(() => {
    async function fetchCategories() {
      try {
        categoriesDispatch({ type: "loading" });
        const { data } = await axios.get(`${BASE_URL}/category`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        categoriesDispatch({ type: "categories/loaded", payload: data.data });
      } catch (error) {
        categoriesDispatch({ type: "categories/loaded", payload: [] });
        categoriesDispatch({ type: "rejected", payload: error });
        console.log(error);
      }
    }
    if (token) fetchCategories();
  }, [token]);

  async function getCategory(id) {
    try {
      categoriesDispatch({ type: "loading" });
      const { data } = await axios.get(`${BASE_URL}/category/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      categoriesDispatch({ type: "category/loaded", payload: data });
    } catch (error) {
      //   toast.error(error.message);
    }
  }
  async function createCategory(newcategory) {
    const data = {
      title: newcategory.title,
      content: newcategory.description,
      userId: "",
      catId: "",
      file: newcategory.image,
    };
    try {
      categoriesDispatch({ type: "loading" });
      const { data } = await axios.post(
        `${BASE_URL}/create-category`,
        newcategory,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      categoriesDispatch({ type: "category/created", payload: data });
    } catch (error) {
      //   toast.error(error.message);
    }
  }
  async function updateCategory(updatedcategory, id) {
    try {
      categoriesDispatch({ type: "loading" });
      const res = await axios.put(
        `${BASE_URL}/update-category/${id}`,
        updatedcategory,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {}
  }
  async function deletecategory(id) {
    try {
      categoriesDispatch({ type: "loading" });
      await axios.delete(`${BASE_URL}/delete-category/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      categoriesDispatch({ type: "category/deleted", payload: id });
    } catch (error) {
      //   toast.error(error.message);
    }
  }
  return (
    <CategoriesContext.Provider
      value={{
        categories,
        isLoading,
        selectedCategory,
        deletecategory,
        createCategory,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}

export function usecategories() {
  return useContext(CategoriesContext);
}
