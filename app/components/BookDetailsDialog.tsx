import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface BookDetailsDialogProps {
  book: any | null;
  onClose: () => void;
}

export default function BookDetailsDialog({
  book,
  onClose,
}: BookDetailsDialogProps) {
  return (
    <Dialog open={!!book} onOpenChange={onClose}>
      <DialogContent>
        {book && (
          <>
            <DialogHeader>
              <DialogTitle>{book.title}</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col items-center gap-4">
              {book.imageUrl && (
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="w-full h-64 object-cover rounded"
                />
              )}

              <div className="text-lg font-semibold">Author: {book.author}</div>
              <p className="text-gray-700">{book.description}</p>

              <p className="text-sm text-gray-500">
                Genre: <span className="font-semibold">{book.genre}</span>
              </p>
              <p className="text-sm text-gray-500">
                Price: <span className="font-semibold">${book.price}</span>
              </p>
              <p className="text-sm text-gray-500">
                Rating: <span className="font-semibold">{book.rating} ⭐</span>
              </p>
              <p className="text-sm text-gray-500">Added by: {book.addedBy}</p>

              <Button variant="outline" onClick={onClose} className="mt-2">
                Close
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
