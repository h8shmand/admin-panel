import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import AppLayout from "./components/AppLayout";
import Categories from "./components/Categories";
import Products from "./components/Products";
import Login from "./components/Login";
import Articles from "./components/Articles";
import Users from "./components/Users";
import AuthProvider, { useAuth } from "./components/context/AuthProvider";
import ProductsProvider from "./components/context/ProductsProvider";
import UsersProvider from "./components/context/UsersProvider";
import CategoriesProvider from "./components/context/CategoriesProvider";
import { ToastContainer } from "react-toastify";
import ArticlesProvider from "./components/context/ArticlesProvider";
import UpdateUserForm from "./components/updating components/UpdateUserForm";
import UpdateProfileForm from "./components/updating components/UpdateProfileForm";
import { useEffect } from "react";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Redirect />} />
        <Route index path="/login" element={<Login />} />
        <Route
          path="*"
          element={
            <UsersProvider>
              <CategoriesProvider>
                <ProductsProvider>
                  <ArticlesProvider>
                    <Routes>
                      <Route path="/dashboard" element={<AppLayout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="categories" element={<Categories />} />
                        <Route path="products" element={<Products />} />
                        <Route path="users" element={<Users />}></Route>
                        <Route path="articles" element={<Articles />} />
                        <Route
                          path="updateProfile"
                          element={<UpdateProfileForm />}
                        />
                      </Route>
                    </Routes>
                  </ArticlesProvider>
                </ProductsProvider>
              </CategoriesProvider>
            </UsersProvider>
          }
        />
      </Routes>
      <ToastContainer />
    </AuthProvider>
  );
}

function Redirect() {
  const { isAuthenticated } = JSON.parse(
    Cookies.get("userInfo") || '{ "isAuthenticated": false }'
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      navigate("/dashboard");
    }
  }, [navigate, isAuthenticated]);
}

export default App;
