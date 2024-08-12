import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import AppLayout from "./components/AppLayout";

function App() {
  return (
    <div className="flex flex-col my-[0.5vh] h-[99vh] mx-auto w-[99vw]">
      <Header />
      <Routes>
        <Route path="/dashboard" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="categories" element={<div>categ</div>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
