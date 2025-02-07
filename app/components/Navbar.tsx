"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import LoginDialog from "./LoginDialog";
import SignUpDialog from "./SignUpDialog";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = Cookies.get("authToken");

    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        setUser({ email: decoded.email });
      } catch (error) {
        console.error("Invalid token:", error);
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("authToken");
    setUser(null);
  };
  console.log("user", user);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Left Section: Logo */}
        <div className="flex items-center space-x-2">
          <img src="/images/logo.png" alt="Bookworm Logo" className="h-8" />
        </div>

        {/* Center Section: Navigation Links */}
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

        {/* Right Section: Account Menu or Login/Signup */}
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
                    onClick={handleLogout}
                    className="block px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-left"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            // Show Login & Signup buttons if not logged in
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
