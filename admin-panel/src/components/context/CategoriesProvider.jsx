import axios from "axios";
import { createContext, useContext, useEffect } from "react";
import { useReducer } from "react";
import { Slide, toast } from "react-toastify";
const BASE_URL = "http://localhost:8008/api";
const CategoriesContext = createContext(null);
const categoriesInitialState = {
  categories: [],
  isLoading: false,
  selectedCategory: "",
  error: "",
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
    case "discardSelected":
      return {
        ...state,
        isLoading: false,
        selectedCategory: "",
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
  const { accessToken } = JSON.parse(Cookies.get("userInfo"));
  async function fetchCategories() {
    try {
      categoriesDispatch({ type: "loading" });
      const { data } = await axios.get(`${BASE_URL}/category`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      categoriesDispatch({ type: "categories/loaded", payload: data.data });
    } catch (error) {
      categoriesDispatch({ type: "categories/loaded", payload: [] });
      categoriesDispatch({ type: "rejected", payload: error });
      console.log(error);
    }
  }
  useEffect(() => {
    if (accessToken) fetchCategories();
  }, [accessToken]);

  async function getCategory(id) {
    try {
      categoriesDispatch({ type: "loading" });
      const { data } = await axios.get(`${BASE_URL}/category/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      categoriesDispatch({ type: "category/loaded", payload: data.data });
    } catch (error) {
      //   toast.error(error.message);
    }
  }
  async function createCategory(newCategory) {
    const formData = new FormData();
    formData.append("name", newCategory.title);
    formData.append("description", newCategory.description);
    formData.append("file", newCategory.image);

    try {
      categoriesDispatch({ type: "loading" });
      const { data } = await axios.post(
        `${BASE_URL}/create-category`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      categoriesDispatch({ type: "category/created", payload: data });
      toast.success(data.data[0].message, {
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
      fetchCategories();
    } catch (error) {
      categoriesDispatch({ type: "rejected" });
      if (error.response.data.message) {
        toast.error(error.response.data.message[0].message, {
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
      } else if (error.response.data.messages) {
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
      }
    }
  }
  async function updateCategory(updatedcategory, id) {
    const formData = new FormData();
    formData.append("name", updatedcategory.title);
    formData.append("description", updatedcategory.description);
    formData.append("file", updatedcategory.image);

    try {
      categoriesDispatch({ type: "loading" });
      const res = await axios.put(
        `${BASE_URL}/update-category/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(res.data.data[0].message, {
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
      fetchCategories();
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
    }
  }
  async function deleteCategory(id) {
    try {
      categoriesDispatch({ type: "loading" });
      await axios.delete(`${BASE_URL}/delete-category/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      categoriesDispatch({ type: "category/deleted", payload: id });
    } catch (error) {
      categoriesDispatch({ type: "rejected" });
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
    }
  }
  function discardSelectedCategory() {
    categoriesDispatch({ type: "discardSelected" });
  }
  return (
    <CategoriesContext.Provider
      value={{
        categories,
        isLoading,
        selectedCategory,
        deleteCategory,
        createCategory,
        getCategory,
        updateCategory,
        discardSelectedCategory,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}

export function useCategories() {
  return useContext(CategoriesContext);
}
