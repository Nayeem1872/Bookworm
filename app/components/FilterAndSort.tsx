"use client";
import { useState } from "react";

export default function FilterAndSort() {
  const [priceRange, setPriceRange] = useState<string>("all");
  const [rating, setRating] = useState<number | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const genres = ["Fiction", "Non-Fiction", "Science", "Romance", "Mystery"];

  // Handle genre selection
  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  return (
    <div className="flex flex-wrap p-6 bg-white  gap-6">
      {/* Sort By Price */}
      <div className="flex-1 min-w-[200px]">
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

      {/* Filter By Rating */}
      <div className="flex-1 min-w-[200px]">
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

      {/* Filter By Genre */}
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

      {/* Apply Filters Button */}
      <div className="min-w-[200px] flex items-end">
        <button
          onClick={() => console.log({ priceRange, rating, selectedGenres })}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
