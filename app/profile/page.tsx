"use client";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BookList from "./components/Booklist";
import AddBookDialog from "./components/AddBookDialog";

export default function Profile() {
  const { isAuthenticated } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const response = await fetch("/api/books/list");
      const data = await response.json();
      if (response.ok) {
        setBooks(data.books);
      } else {
        console.error("Failed to fetch books:", data.message);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <Navbar />

      <div className="container mx-auto p-4 ">
        <h1 className="text-2xl font-bold mt-32">User Profile</h1>
        <p>Welcome to your profile page!</p>

        {isAuthenticated() && <AddBookDialog refreshBooks={fetchBooks} />}
      </div>

      <BookList books={books} refreshBooks={fetchBooks} />
    </>
  );
}
