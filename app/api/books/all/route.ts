import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Book from "@/models/Book";

export async function GET() {
  try {
    await connectToDatabase();

    // ✅ Fetch all books without filtering by user
    const books = await Book.find()
      .select("title author description imageUrl addedBy createdAt")
      .sort({ createdAt: -1 });

    return NextResponse.json({ books }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch books", error: (error as Error).message },
      { status: 500 }
    );
  }
}
