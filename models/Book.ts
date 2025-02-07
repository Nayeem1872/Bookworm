import mongoose, { Schema, Document } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  addedBy: string; // Email of the user who added the book
  createdAt: Date;
}

// Define the schema for books
const BookSchema: Schema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    addedBy: { type: String, required: true }, // Stores the user's email
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Ensure the model is not recompiled when using Next.js
const Book = mongoose.models.Book || mongoose.model<IBook>("Book", BookSchema);

export default Book;
