"use client";
import { useState, useEffect } from "react";

interface FilterProps {
  onFilterChange: (filters: {
    priceRange: string;
    rating: number | null;
    selectedGenres: string[];
  }) => void;
}

export default function FilterAndSort({ onFilterChange }: FilterProps) {
  const [priceRange, setPriceRange] = useState<string>("all");
  const [rating, setRating] = useState<number | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const genres = ["Fiction", "Non-Fiction", "Science", "Romance", "Mystery"];

  useEffect(() => {
    onFilterChange({ priceRange, rating, selectedGenres });
  }, [priceRange, rating, selectedGenres, onFilterChange]);

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prevGenres) =>
      prevGenres.includes(genre)
        ? prevGenres.filter((g) => g !== genre)
        : [...prevGenres, genre]
    );
  };

  return (
    <div className="flex flex-wrap p-6 bg-white gap-6">
      <div className="w-full">
        <label className="block font-medium text-gray-800">
          Sort by Price:
        </label>
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="w-full mt-2 p-2 border rounded-md"
        >
          <option value="all">All</option>
          <option value="low-to-high">Low to High</option>
          <option value="high-to-low">High to Low</option>
        </select>
      </div>

      <div className="w-full">
        <label className="block font-medium text-gray-800">
          Filter by Rating:
        </label>
        <select
          value={rating ?? ""}
          onChange={(e) => setRating(Number(e.target.value) || null)}
          className="w-full mt-2 p-2 border rounded-md"
        >
          <option value="">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars & Up</option>
          <option value="3">3 Stars & Up</option>
          <option value="2">2 Stars & Up</option>
          <option value="1">1 Star & Up</option>
        </select>
      </div>

      <div className="flex-1 min-w-[200px]">
        <label className="block font-medium text-gray-800">
          Filter by Genre:
        </label>
        <div className="flex flex-col space-y-2 mt-2">
          {genres.map((genre) => (
            <label key={genre} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedGenres.includes(genre)}
                onChange={() => toggleGenre(genre)}
                className="w-4 h-4"
              />
              <span>{genre}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
