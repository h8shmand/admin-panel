import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import AppLayout from "./components/AppLayout";
import Categories from "./components/Categories";
import Products from "./components/Products";
import Login from "./components/Login";
import Articles from "./components/Article";
import Users from "./components/Users";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="categories" element={<Categories />} />
          <Route path="products" element={<Products />} />
          <Route path="users" element={<Users />}></Route>
          <Route path="articles" element={<Articles />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
