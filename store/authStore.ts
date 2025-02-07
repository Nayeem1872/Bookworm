import { create } from "zustand";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";

interface AuthState {
  user: { email: string } | null;
  isAuthenticated: () => boolean;
  login: (token: string) => void;
  logout: () => void;
  checkAuth: () => void;
}

// Zustand store for authentication
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: () => !!Cookies.get("authToken"),
  // Function to log in the user and update the store
  login: (token) => {
    Cookies.set("authToken", token, { expires: 7 });

    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const decoded = JSON.parse(atob(base64));

      set({ user: { email: decoded.email } });
    } catch (error) {
      console.error("Error decoding token:", error);
      set({ user: null });
    }
  },

  checkAuth: () => {
    const token = Cookies.get("authToken");

    if (token) {
      try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const decoded = JSON.parse(atob(base64));

        set({ user: { email: decoded.email } });
      } catch (error) {
        console.error("Invalid token:", error);
        set({ user: null });
      }
    }
  },

  // Function to log out the user
  logout: () => {
    Cookies.remove("authToken");
    set({ user: null });
    redirect("/");
  },
}));
