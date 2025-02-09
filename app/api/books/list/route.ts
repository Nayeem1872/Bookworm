import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Book from "@/models/Book";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export async function GET() {
  try {
    await connectToDatabase();

    const cookieStore = await cookies();
    const token = cookieStore.get("authToken")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return NextResponse.json({ message: "Invalid token" }, { status: 403 });
    }

    const userEmail = (decoded as jwt.JwtPayload).email;

    const books = await Book.find({ addedBy: userEmail })
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
