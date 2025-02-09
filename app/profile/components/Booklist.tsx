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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  imageUrl?: string;
  addedBy: string;
}

export default function BookList({ books }: { books: Book[] }) {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Book List</h1>

      {!books.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book) => (
            <Card
              key={book._id}
              className="shadow-lg hover:shadow-xl transition cursor-pointer"
              onClick={() => setSelectedBook(book)} // ✅ Open modal on click
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

                <CardTitle className="mt-2">{book.title}</CardTitle>
                <CardDescription>By {book.author}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Added by: {book.addedBy}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* ✅ Book Details Modal */}
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
    </div>
  );
}
