import { logout } from "@/api/auth.api";

export const handleLogout = async () => {
    await logout();
    sessionStorage.removeItem("isLoggedIn");
    window.location.href = "/auth";
  };