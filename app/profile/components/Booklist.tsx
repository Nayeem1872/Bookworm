"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function BookList() {
  interface Book {
    _id: string;
    title: string;
    author: string;
    addedBy: string;
  }

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Book List</h1>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.length > 0 ? (
            books.map((book) => (
              <Card
                key={book._id}
                className="shadow-lg hover:shadow-xl transition"
              >
                <CardHeader>
                  <CardTitle>{book.title}</CardTitle>
                  <CardDescription>By {book.author}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Added by: {book.addedBy}
                  </p>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600">
              No books available.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
