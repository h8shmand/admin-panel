import axios from "axios";
import { createContext, useContext, useEffect } from "react";
import { useReducer } from "react";
import { Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = "http://localhost:8008/api";
const ProductsContext = createContext(null);
const productsInitialState = {
  products: [],
  isLoading: false,
  selectedProduct: "",
  error: "",
};

function productsReducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "products/loaded":
      return {
        ...state,
        isLoading: false,
        products: action.payload,
      };
    case "product/loaded":
      return {
        ...state,
        isLoading: false,
        selectedProduct: action.payload,
      };
    case "product/created":
      return {
        ...state,
        isLoading: false,
        products: [...state.products, action.payload],
      };
    case "product/deleted":
      return {
        ...state,
        isLoading: false,
        products: state.products.filter((item) => item.id !== action.payload),
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
        selectedProduct: "",
      };
    default:
      throw new Error("Action Not Available!");
  }
}

export default function ProductsProvider({ children }) {
  const [{ products, isLoading, selectedProduct, error }, productsDispatch] =
    useReducer(productsReducer, productsInitialState);
  const { userId, accessToken } = JSON.parse(Cookies.get("userInfo"));
  async function fetchProducts() {
    try {
      productsDispatch({ type: "loading" });
      const { data } = await axios.get(`${BASE_URL}/products`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      productsDispatch({ type: "products/loaded", payload: data.data });
    } catch (error) {
      productsDispatch({ type: "products/loaded", payload: [] });
      productsDispatch({ type: "rejected", payload: error });
      console.log(error);
    }
  }
  useEffect(() => {
    if (accessToken) fetchProducts();
  }, [accessToken]);

  async function getProduct(id) {
    try {
      productsDispatch({ type: "loading" });
      const { data } = await axios.get(`${BASE_URL}/product/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      productsDispatch({ type: "product/loaded", payload: data.data });
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
  async function createProduct(newProduct) {
    const formData = new FormData();
    formData.append("title", newProduct.title);
    formData.append("content", newProduct.description);
    formData.append("userId", userId);
    formData.append("catId", Number(newProduct.categoryId));
    formData.append("file", newProduct.image);

    try {
      productsDispatch({ type: "loading" });
      const res = await axios.post(`${BASE_URL}/create_product`, formData, {
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
        theme: "light",
        transition: Slide,
        rtl: true,
      });
      fetchProducts();
      productsDispatch({ type: "product/created", payload: data });
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
  async function updateProduct(updatedProduct, id) {
    const formData = new FormData();
    formData.append("title", updatedProduct.title);
    formData.append("content", updatedProduct.description);
    formData.append("userId", userId);
    formData.append("catId", Number(updatedProduct.categoryId));
    formData.append("file", updatedProduct.image);
    try {
      productsDispatch({ type: "loading" });
      const res = await axios.put(`${BASE_URL}/product/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      fetchProducts();
      toast.success(res.data.data[0].message, {
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
  async function deleteProduct(id) {
    try {
      productsDispatch({ type: "loading" });
      await axios.delete(`${BASE_URL}/product/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      productsDispatch({ type: "product/deleted", payload: id });
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
  function discardSelectedProduct() {
    productsDispatch({ type: "discardSelected" });
  }
  return (
    <ProductsContext.Provider
      value={{
        products,
        isLoading,
        selectedProduct,
        deleteProduct,
        createProduct,
        updateProduct,
        getProduct,
        discardSelectedProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}
