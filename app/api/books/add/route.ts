import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import Book from "@/models/Book";
import { cookies } from "next/headers"; // ✅ Import Next.js cookie helper

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export async function POST(req: Request) {
  try {
    // ✅ Extract token from cookies instead of headers
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized: No token found" },
        { status: 401 }
      );
    }

    // Verify JWT
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return NextResponse.json({ message: "Invalid token" }, { status: 403 });
    }

    // Get book data from request body
    const { title, author } = await req.json();
    if (!title || !author) {
      return NextResponse.json(
        { message: "Title and author are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Create and save new book
    const newBook = new Book({
      title,
      author,
      addedBy: (decoded as jwt.JwtPayload).email,
    });
    await newBook.save();

    return NextResponse.json(
      { message: "Book added successfully", book: newBook },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Server error", error: errorMessage },
      { status: 500 }
    );
  }
}
