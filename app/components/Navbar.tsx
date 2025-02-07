"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import LoginDialog from "./LoginDialog";
import SignUpDialog from "./SignUpDialog";

export default function Navbar() {
  const { user, checkAuth, logout } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <img src="/images/logo.png" alt="Bookworm Logo" className="h-8" />
        </div>

        <ul className="hidden md:flex space-x-6">
          <li>
            <a href="#" className="text-gray-800 hover:text-gray-600">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-800 hover:text-gray-600">
              About
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-800 hover:text-gray-600">
              Contact
            </a>
          </li>
        </ul>
        <div className="flex items-center space-x-4">
          {user ? (
            // Show user account menu if logged in
            <div className="relative group">
              <button className="text-gray-800 hover:text-gray-600">
                {user.email}
              </button>
              <ul className="absolute hidden group-hover:block bg-white shadow-md p-2 rounded">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Profile
                  </a>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="block px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-left"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <LoginDialog />
              <SignUpDialog />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
