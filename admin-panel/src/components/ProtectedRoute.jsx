import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  console.log("yyyy");

  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) navigate("/login");
  }, [navigate, isAuthenticated]);
  return isAuthenticated ? console.log("yes") : console.log("no");
}
