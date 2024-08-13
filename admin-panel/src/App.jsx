import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import AppLayout from "./components/AppLayout";
import Categories from "./components/Categories";
import Products from "./components/Products";
import Login from "./components/Login";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="categories" element={<Categories />} />
          <Route path="products" element={<Products />} />
          <Route
            path="categories/create-category"
            element={<div>create</div>}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
