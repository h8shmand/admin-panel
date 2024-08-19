import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import AppLayout from "./components/AppLayout";
import Categories from "./components/Categories";
import Products from "./components/Products";
import Login from "./components/Login";
import Articles from "./components/Articles";
import Users from "./components/Users";
import AuthProvider from "./components/context/AuthProvider";
import ProductsProvider from "./components/context/ProductsProvider";
import UsersProvider from "./components/context/UsersProvider";
import CategoriesProvider from "./components/context/CategoriesProvider";
import { ToastContainer } from "react-toastify";
import ArticlesProvider from "./components/context/ArticlesProvider";

function App() {
  return (
    <AuthProvider>
      <UsersProvider>
        <CategoriesProvider>
          <ProductsProvider>
            <ArticlesProvider>
              <Routes>
                <Route index path="/login" element={<Login />} />
                <Route path="/dashboard" element={<AppLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="categories" element={<Categories />} />
                  <Route path="products" element={<Products />} />
                  <Route path="users" element={<Users />}></Route>
                  <Route path="articles" element={<Articles />} />
                </Route>
              </Routes>
            </ArticlesProvider>
          </ProductsProvider>
        </CategoriesProvider>
      </UsersProvider>
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
