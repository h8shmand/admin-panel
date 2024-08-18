import axios from "axios";
import { createContext, useContext, useEffect } from "react";
import { useReducer } from "react";
import { useAuth } from "./AuthProvider";
const BASE_URL = "http://localhost:8008/api";
const ProductsContext = createContext(null);
const productsInitialState = {
  products: [],
  isLoading: false,
  selectedProduct: null,
  error: null,
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
    default:
      throw new Error("Action Not Available!");
  }
}

export default function ProductsProvider({ children }) {
  const [{ products, isLoading, selectedProduct, error }, productsDispatch] =
    useReducer(productsReducer, productsInitialState);
  const { token } = useAuth();
  useEffect(() => {
    async function fetchProducts() {
      try {
        productsDispatch({ type: "loading" });
        const { data } = await axios.get(`${BASE_URL}/products`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(data);

        productsDispatch({ type: "products/loaded", payload: data.data });
      } catch (error) {
        productsDispatch({ type: "products/loaded", payload: [] });
        productsDispatch({ type: "rejected", payload: error });
        console.log(error);
      }
    }
    if (token) fetchProducts();
  }, [token]);

  async function getProduct(id) {
    try {
      productsDispatch({ type: "loading" });
      const { data } = await axios.get(`${BASE_URL}/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      productsDispatch({ type: "product/loaded", payload: data });
    } catch (error) {
      //   toast.error(error.message);
    }
  }
  async function createProduct(newProduct) {
    const data = {
      title: newProduct.title,
      content: newProduct.description,
      userId: "",
      catId: "",
      file: newProduct.image,
    };
    try {
      productsDispatch({ type: "loading" });
      const { data } = await axios.post(
        `${BASE_URL}/create_product`,
        newProduct,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      productsDispatch({ type: "product/created", payload: data });
    } catch (error) {
      //   toast.error(error.message);
    }
  }
  async function updateProduct(updatedProduct, id) {
    try {
      productsDispatch({ type: "loading" });
      const res = await axios.put(`${BASE_URL}/product/${id}`, updatedProduct, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {}
  }
  async function deleteProduct(id) {
    try {
      productsDispatch({ type: "loading" });
      await axios.delete(`${BASE_URL}/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      productsDispatch({ type: "product/deleted", payload: id });
    } catch (error) {
      //   toast.error(error.message);
    }
  }
  return (
    <ProductsContext.Provider
      value={{
        products,
        isLoading,
        selectedProduct,
        deleteProduct,
        createProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}
