import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Book from "@/models/Book";

export async function GET() {
  try {
    await connectToDatabase();
    const books = await Book.find().sort({ createdAt: -1 }); // Fetch books in descending order

    return NextResponse.json({ books }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch books", error: (error as Error).message },
      { status: 500 }
    );
  }
}
