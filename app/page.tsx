"use client";
import { useState, useEffect } from "react";
import FilterAndSort from "./components/FilterAndSort";
import Navbar from "./components/Navbar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  imageUrl?: string;
  addedBy: string;
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("/api/books/all");
        const data = await response.json();
        setBooks(data.books);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16">
          {/* Filter Sidebar (Responsive) */}
          <div className="md:col-span-1 bg-white p-4 rounded shadow hidden sm:block">
            <FilterAndSort />
          </div>

          {/* Books Section */}
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
            {loading ? (
              Array(6)
                .fill(null)
                .map((_, index) => (
                  <Skeleton key={index} className="h-64 w-full rounded-lg" />
                ))
            ) : books.length > 0 ? (
              books.map((book) => (
                <Card
                  key={book._id}
                  className="shadow-lg hover:shadow-xl transition cursor-pointer rounded-lg"
                  onClick={() => setSelectedBook(book)}
                >
                  <CardHeader>
                    {book.imageUrl ? (
                      <img
                        src={book.imageUrl}
                        alt={book.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                    ) : (
                      <Skeleton className="w-full h-48 rounded-t-lg" />
                    )}

                    <CardTitle className="mt-2 text-lg sm:text-xl">
                      {book.title}
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base">
                      By {book.author}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Added by: {book.addedBy}
                    </p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-gray-600 text-center w-full">
                No books available.
              </p>
            )}
          </div>
        </div>
      </div>

      <Dialog open={!!selectedBook} onOpenChange={() => setSelectedBook(null)}>
        <DialogContent>
          {selectedBook && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedBook.title}</DialogTitle>
              </DialogHeader>

              <div className="flex flex-col items-center gap-4">
                {selectedBook.imageUrl && (
                  <img
                    src={selectedBook.imageUrl}
                    alt={selectedBook.title}
                    className="w-full h-64 object-cover rounded"
                  />
                )}

                <div className="text-lg font-semibold">
                  Author: {selectedBook.author}
                </div>
                <p className="text-gray-700">{selectedBook.description}</p>
                <p className="text-sm text-gray-500">
                  Added by: {selectedBook.addedBy}
                </p>

                <Button
                  variant="outline"
                  onClick={() => setSelectedBook(null)}
                  className="mt-2"
                >
                  Close
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
