"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

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

export default function BookModals({
  selectedBook,
  setSelectedBook,
  showDeleteModal,
  setShowDeleteModal,
  handleDeleteBook,
  isDeleting,
  handleOpenDeleteModal,
  renderStars,
}: {
  selectedBook: Book | null;
  setSelectedBook: (book: Book | null) => void;
  showDeleteModal: boolean;
  setShowDeleteModal: (open: boolean) => void;
  handleDeleteBook: () => void;
  isDeleting: boolean;
  handleOpenDeleteModal: () => void;
  renderStars: (rating: number) => string;
}) {
  return (
    <>
      {/* ✅ Book Details Modal */}
      <Dialog open={!!selectedBook} onOpenChange={() => setSelectedBook(null)}>
        <DialogContent className="max-w-lg md:max-w-2xl p-6 rounded-lg">
          {selectedBook && (
            <>
              <DialogHeader className="text-center">
                <DialogTitle className="text-2xl font-bold">
                  {selectedBook.title}
                </DialogTitle>
                <p className="text-sm text-gray-500">
                  By {selectedBook.author}
                </p>
              </DialogHeader>

              {/* Image Section */}
              {selectedBook.imageUrl && (
                <div className="w-full h-72 overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={selectedBook.imageUrl}
                    alt={selectedBook.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Book Details */}
              <div className="text-center space-y-4">
                <p className="text-gray-700 text-base">
                  {selectedBook.description}
                </p>

                <div className="flex flex-wrap justify-center items-center gap-4 text-lg font-medium">
                  <span className="text-green-600">
                    💲 Price: ${selectedBook.price}
                  </span>
                  <span className="text-yellow-500">
                    ⭐ {renderStars(selectedBook.rating)}
                  </span>
                </div>

                <p className="text-sm text-gray-600">
                  <span className="px-3 py-1 bg-gray-200 rounded-full">
                    {selectedBook.genre}
                  </span>
                </p>

                <p className="text-xs text-gray-500">
                  Added by: {selectedBook.addedBy}
                </p>
              </div>

              {/* ✅ Buttons */}
              <div className="flex justify-between mt-6">
                <Button
                  variant="destructive"
                  onClick={handleOpenDeleteModal}
                  className="bg-red-600 text-white hover:bg-red-700 px-6 py-2 rounded-lg"
                >
                  Delete
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setSelectedBook(null)}
                  className="px-6 py-2 text-lg rounded-lg border-gray-300 hover:bg-gray-200 transition"
                >
                  Close
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* ✅ Delete Confirmation Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="max-w-md p-6 rounded-lg">
          <DialogHeader className="text-center">
            <DialogTitle className="text-lg font-bold text-red-600">
              Confirm Delete
            </DialogTitle>
          </DialogHeader>

          <p className="text-gray-700 text-center">
            Are you sure you want to delete <b>{selectedBook?.title}</b>?<br />
            This action cannot be undone.
          </p>

          <DialogFooter className="flex justify-between mt-4">
            <Button
              variant="outline"
              onClick={() => setShowDeleteModal(false)}
              className="px-4 py-2"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteBook}
              className="bg-red-600 text-white hover:bg-red-700 px-4 py-2"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
