import axios from "axios";
import { createContext, useContext, useEffect } from "react";
import { useReducer } from "react";
import { Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = "http://localhost:8008/api";
const ArticlesContext = createContext(null);
const articlesInitialState = {
  articles: [],
  isLoading: false,
  selectedArticle: "",
  error: "",
};

function articlesReducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "articles/loaded":
      return {
        ...state,
        isLoading: false,
        articles: action.payload,
      };
    case "article/loaded":
      return {
        ...state,
        isLoading: false,
        selectedArticle: action.payload,
      };
    case "article/created":
      return {
        ...state,
        isLoading: false,
        articles: [...state.articles, action.payload],
      };
    case "article/deleted":
      return {
        ...state,
        isLoading: false,
        articles: state.articles.filter((item) => item.id !== action.payload),
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
        selectedArticle: "",
      };
    default:
      throw new Error("Action Not Available!");
  }
}

export default function ArticlesProvider({ children }) {
  const [{ articles, isLoading, selectedArticle, error }, articlesDispatch] =
    useReducer(articlesReducer, articlesInitialState);
  const { userId, accessToken } = JSON.parse(Cookies.get("userInfo"));
  async function fetchArticles() {
    try {
      articlesDispatch({ type: "loading" });
      const { data } = await axios.get(`${BASE_URL}/articles`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      articlesDispatch({ type: "articles/loaded", payload: data.data });
    } catch (error) {
      articlesDispatch({ type: "articles/loaded", payload: [] });
      articlesDispatch({ type: "rejected", payload: error });
      console.log(error);
    }
  }
  useEffect(() => {
    if (accessToken) fetchArticles();
  }, [accessToken]);

  async function getArticle(id) {
    try {
      articlesDispatch({ type: "loading" });
      const { data } = await axios.get(`${BASE_URL}/article/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      articlesDispatch({ type: "article/loaded", payload: data.data });
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
  async function createArticle(newarticle) {
    const formData = new FormData();
    formData.append("title", newarticle.title);
    formData.append("content", newarticle.content);
    formData.append("userId", userId);
    formData.append("file", newarticle.image);

    try {
      articlesDispatch({ type: "loading" });
      const res = await axios.post(`${BASE_URL}/create_articles`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

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
      fetchArticles();
      articlesDispatch({ type: "article/created", payload: data });
    } catch (error) {
      console.log(error);
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
  async function updateArticle(updatedArticle, id) {
    const formData = new FormData();
    formData.append("title", updatedArticle.title);
    formData.append("content", updatedArticle.content);
    formData.append("userId", userId);
    formData.append("file", updatedArticle.image);
    try {
      articlesDispatch({ type: "loading" });
      const res = await axios.put(`${BASE_URL}/article/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
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
      fetchArticles();
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
  async function deleteArticle(id) {
    try {
      articlesDispatch({ type: "loading" });
      await axios.delete(`${BASE_URL}/article/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      articlesDispatch({ type: "article/deleted", payload: id });
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
  function discardSelectedArticle() {
    articlesDispatch({ type: "discardSelected" });
  }
  return (
    <ArticlesContext.Provider
      value={{
        articles,
        isLoading,
        selectedArticle,
        deleteArticle,
        createArticle,
        updateArticle,
        getArticle,
        discardSelectedArticle,
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
}

export function useArticles() {
  return useContext(ArticlesContext);
}
