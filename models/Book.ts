import mongoose, { Schema, Document } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  addedBy: string;
  description: string;
  price: number;
  rating: number;
  genre: string;
  imageUrl: string;
  createdAt: Date;
}

const BookSchema: Schema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    genre: { type: String, required: true },
    addedBy: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.models.Book || mongoose.model<IBook>("Book", BookSchema);

export default Book;
