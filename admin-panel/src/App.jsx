import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import AppLayout from "./components/AppLayout";
import Categories from "./components/Categories";
import Products from "./components/Products";
import Login from "./components/Login";
import Articles from "./components/Article";
import Users from "./components/Users";
import AuthProvider from "./components/context/AuthProvider";
import ProductsProvider from "./components/context/ProductsProvider";
import UsersProvider from "./components/context/UsersProvider";

function App() {
  return (
    <AuthProvider>
      <UsersProvider>
        <ProductsProvider>
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
        </ProductsProvider>
      </UsersProvider>
    </AuthProvider>
  );
}

export default App;
