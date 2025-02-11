"use client";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import LoginDialog from "./LoginDialog";
import SignUpDialog from "./SignUpDialog";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const { user, checkAuth, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <Link href="/">
            <img
              src="/images/logo.png"
              alt="Bookworm Logo"
              className="h-8 cursor-pointer"
            />
          </Link>
        </div>

        <ul className="hidden md:flex space-x-6">
          {["Home", "About", "Contact"].map((item, index) => (
            <li key={index}>
              <Link
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="text-gray-800 hover:text-gray-600 transition duration-200"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="text-gray-800 hover:text-gray-600 flex items-center gap-1">
                {user.email} ▼
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logout}
                  className="text-red-600 cursor-pointer"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <LoginDialog />
              <SignUpDialog />
            </>
          )}
        </div>

        <button
          className="md:hidden text-gray-800 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute w-full">
          <ul className="flex flex-col items-center py-4 space-y-3">
            {["Home", "About", "Contact"].map((item, index) => (
              <li key={index}>
                <Link
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-gray-800 hover:text-gray-600 block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
