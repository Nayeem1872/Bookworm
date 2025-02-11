"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
const genres = ["Fiction", "Non-Fiction", "Science", "Romance", "Mystery"];

export default function AddBookDialog({
  refreshBooks,
}: {
  refreshBooks: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [rating, setRating] = useState<number | "">(0);
  const [genre, setGenre] = useState(genres[0]); // ✅ Added genre
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
      toast.error("Please upload an image.");
      return;
    }

    if (!price || price <= 0) {
      toast.error("Price must be a positive number.");
      return;
    }

    if (typeof rating === "number" && (rating < 0 || rating > 5)) {
      toast.error("Rating must be between 0 and 5.");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("description", description);
    formData.append("price", price.toString());
    formData.append("rating", rating.toString());
    formData.append("genre", genre);
    formData.append("image", imageFile);

    try {
      const response = await fetch("/api/books/add", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Book added successfully!");
        setIsOpen(false);
        setTitle("");
        setAuthor("");
        setDescription("");
        setPrice("");
        setRating(0);
        setGenre(genres[0]);
        setImageFile(null);
        refreshBooks();
      } else {
        toast.error(data.message || "Failed to add book");
      }
    } catch (error) {
      toast.error("An error occurred while adding the book.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Add New Book
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a New Book</DialogTitle>
          </DialogHeader>

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

            <div>
              <label className="block text-sm font-medium text-gray-800">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md"
                placeholder="Enter book description"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800">
                Price ($)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
                className="w-full mt-1 p-2 border rounded-md"
                placeholder="Enter book price"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800">
                Rating (0-5)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={rating}
                onChange={(e) => setRating(parseFloat(e.target.value))}
                className="w-full mt-1 p-2 border rounded-md"
                placeholder="Enter book rating (Optional)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800">
                Genre
              </label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md"
              >
                {genres.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800">
                Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setImageFile(e.target.files ? e.target.files[0] : null)
                }
                className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>

            <DialogFooter>
              <Button
                type="submit"
                className="bg-green-600 text-white hover:bg-green-700"
                disabled={isLoading}
              >
                {isLoading ? "Adding..." : "Add Book"}
              </Button>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
