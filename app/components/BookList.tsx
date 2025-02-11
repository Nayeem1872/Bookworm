"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface BookListProps {
  books: any[];
  loading: boolean;
  onSelectBook: (book: any) => void;
}

export default function BookList({
  books,
  loading,
  onSelectBook,
}: BookListProps) {
  return (
    <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
      {loading ? (
        Array(6)
          .fill(null)
          .map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Skeleton className="h-64 w-full rounded-lg animate-pulse" />
            </motion.div>
          ))
      ) : books.length > 0 ? (
        books.map((book, index) => (
          <motion.div
            key={book._id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: index * 0.1 }}
          >
            <Card
              className="shadow-lg hover:shadow-xl transition cursor-pointer rounded-lg"
              onClick={() => onSelectBook(book)}
            >
              <CardHeader>
                {book.imageUrl ? (
                  <motion.img
                    src={book.imageUrl}
                    alt={book.title}
                    className="w-full h-68 object-cover rounded-t-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                ) : (
                  <Skeleton className="w-full h-48 rounded-t-lg animate-pulse" />
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
                  Genre: <span className="font-medium">{book.genre}</span>
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                  Price: <span className="font-medium">${book.price}</span>
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                  Rating: <span className="font-medium">{book.rating} ⭐</span>
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                  Added by: {book.addedBy}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))
      ) : (
        <motion.div
          className="text-center p-6 border border-gray-300 rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-gray-600 text-lg">No books available.</p>
          <p className="text-sm text-gray-500">Start by adding a new book!</p>
        </motion.div>
      )}
    </div>
  );
}
