"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";
import BookModals from "./BookModals";

interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  imageUrl?: string;
  price: number;
  rating: number;
  genre: string;
  addedBy: string;
}

export default function BookList({
  books,
  refreshBooks,
}: {
  books: Book[];
  refreshBooks: () => void;
}) {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loadingImages, setLoadingImages] = useState<{
    [key: string]: boolean;
  }>({});

  const renderStars = (rating: number) => {
    const maxStars = 5;
    return (
      "⭐".repeat(Math.round(rating)) +
      "☆".repeat(maxStars - Math.round(rating))
    );
  };

  const handleOpenDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteBook = async () => {
    if (!selectedBook) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/books/delete/${selectedBook._id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Book deleted successfully!");
        setSelectedBook(null);
        refreshBooks();
      } else {
        toast.error(data.message || "Failed to delete book");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the book.");
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Book List</h1>

      {books.length === 0 ? (
        <div className="text-center p-6 border border-gray-300 rounded-lg">
          <p className="text-gray-600 text-lg">You don't have any books yet.</p>
          <p className="text-sm text-gray-500">Start by adding a new book!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book) => (
            <Card
              key={book._id}
              className="shadow-lg hover:shadow-xl transition cursor-pointer"
              onClick={() => setSelectedBook(book)}
            >
              <CardHeader>
                {loadingImages[book._id] ? (
                  <Skeleton className="w-full h-48 object-cover rounded-t-lg" />
                ) : (
                  <img
                    src={book.imageUrl}
                    alt={book.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                    onLoad={() =>
                      setLoadingImages((prev) => ({
                        ...prev,
                        [book._id]: false,
                      }))
                    }
                    onError={() =>
                      setLoadingImages((prev) => ({
                        ...prev,
                        [book._id]: false,
                      }))
                    }
                  />
                )}
                <CardTitle className="mt-2">{book.title}</CardTitle>
                <CardDescription>By {book.author}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Genre: {book.genre}</p>
                <p className="text-xs text-gray-500">
                  Added by: {book.addedBy}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <BookModals
        {...{
          selectedBook,
          setSelectedBook,
          showDeleteModal,
          setShowDeleteModal,
          handleDeleteBook,
          isDeleting,
          handleOpenDeleteModal,
          renderStars,
        }}
      />
    </div>
  );
}
