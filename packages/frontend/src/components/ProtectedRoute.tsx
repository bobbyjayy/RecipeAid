import type { JSX } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
