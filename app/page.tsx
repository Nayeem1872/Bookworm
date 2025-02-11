"use client";
import { useState, useEffect, useCallback } from "react";
import FilterAndSort from "./components/FilterAndSort";
import Navbar from "./components/Navbar";
import BookList from "./components/BookList";
import BookDetailsDialog from "./components/BookDetailsDialog";

interface Book {
  _id: string;
  title: string;
  author: string;
  description?: string;
  price?: number;
  rating?: number;
  genre?: string;
  imageUrl?: string;
  addedBy: string;
}

interface FilterOptions {
  priceRange: string;
  rating: number | null;
  selectedGenres: string[];
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    priceRange: "all",
    rating: null,
    selectedGenres: [],
  });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("/api/books/all");
        const data = await response.json();
        setBooks(data.books);
        setFilteredBooks(data.books); // Initially, all books are displayed
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const applyFilters = useCallback(() => {
    let filtered = [...books];
  
    // Ensure rating is a valid number before filtering
    const minRating = filterOptions.rating ?? 0;
  
    // Filter by rating (only if a rating is selected)
    if (filterOptions.rating !== null) {
      filtered = filtered.filter((book) => book.rating !== undefined && book.rating >= minRating);
    }
  
    // Filter by genre (only if genres are selected)
    if (filterOptions.selectedGenres.length > 0) {
      filtered = filtered.filter((book) => book.genre && filterOptions.selectedGenres.includes(book.genre));
    }
  
    // Sort by price
    if (filterOptions.priceRange === "low-to-high") {
      filtered.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    } else if (filterOptions.priceRange === "high-to-low") {
      filtered.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    }
  
    setFilteredBooks(filtered);
  }, [books, filterOptions]);
  

  // Ensure filtering is applied whenever `filterOptions` change
  useEffect(() => {
    applyFilters();
  }, [filterOptions, applyFilters]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16">
          {/* Filter Sidebar */}
          <div className="md:col-span-1 bg-white p-4 h-[750] rounded shadow hidden sm:block">
            <FilterAndSort onFilterChange={setFilterOptions} />
          </div>

          {/* Filtered Book List */}
          <BookList books={filteredBooks} loading={loading} onSelectBook={setSelectedBook} />
        </div>
      </div>

      {/* Book Details Dialog */}
      <BookDetailsDialog book={selectedBook} onClose={() => setSelectedBook(null)} />
    </>
  );
}
