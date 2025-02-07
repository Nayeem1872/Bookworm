"use client";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Navbar from "../components/Navbar";
import BookList from "./components/Booklist";

export default function Profile() {
  const { isAuthenticated } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/books/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, author }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Book added successfully!");
        setIsOpen(false);
        setTitle("");
        setAuthor("");
      } else {
        alert(data.message || "Failed to add book");
      }
    } catch (error) {
      alert("An error occurred while adding the book.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">User Profile</h1>
        <p>Welcome to your profile page!</p>
      </div>
      <h1 className="text-2xl font-bold">Books List</h1>
      <BookList />
      {/* Only show "Add Book" button if user is logged in */}
      {isAuthenticated() && (
        <Button
          onClick={() => setIsOpen(true)}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add New Book
        </Button>
      )}

      {/* Book Form Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a New Book</DialogTitle>
          </DialogHeader>

          {/* Book Form */}
          <form className="space-y-4" onSubmit={handleAddBook}>
            <div>
              <label className="block text-sm font-medium text-gray-800">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md"
                placeholder="Enter book title"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800">
                Author
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md"
                placeholder="Enter book author"
                required
              />
            </div>

            <DialogFooter>
              <Button
                type="submit"
                className="bg-green-600 text-white hover:bg-green-700"
              >
                Add Book
              </Button>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
