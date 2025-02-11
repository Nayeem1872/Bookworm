import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import Book from "@/models/Book";
import { cookies } from "next/headers";
import cloudinary from "@/lib/cloudinary";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized: No token found" },
        { status: 401 }
      );
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return NextResponse.json({ message: "Invalid token" }, { status: 403 });
    }

    const formData = await req.formData();
    const title = formData.get("title")?.toString().trim();
    const author = formData.get("author")?.toString().trim();
    const description = formData.get("description")?.toString().trim();
    const price = parseFloat(formData.get("price")?.toString() || "0"); 
    const rating = parseFloat(formData.get("rating")?.toString() || "0"); 
    const genre = formData.get("genre")?.toString().trim(); 
    const imageFile = formData.get("image") as Blob;

    if (!title || !author || !description || !price || !genre || !imageFile) {
      console.error("❌ Missing required fields");
      return NextResponse.json(
        { message: "All fields (title, author, description, price, genre, image) are required" },
        { status: 400 }
      );
    }

 
    if (imageFile.size > MAX_IMAGE_SIZE) {
      return NextResponse.json(
        { message: `Image size should be less than ${MAX_IMAGE_SIZE / (1024 * 1024)}MB` },
        { status: 400 }
      );
    }

    await connectToDatabase();

    let uploadedImageUrl = "";

    try {
      const imageBuffer = await imageFile.arrayBuffer();
      const base64Image = Buffer.from(imageBuffer).toString("base64");

      const uploadedImage = await cloudinary.uploader.upload(
        `data:image/png;base64,${base64Image}`,
        { folder: "books" }
      );

      uploadedImageUrl = uploadedImage.secure_url;
    } catch (imageUploadError) {
      return NextResponse.json(
        { message: "Image upload failed", error: (imageUploadError as Error).message },
        { status: 500 }
      );
    }

    if (!uploadedImageUrl) {
      return NextResponse.json(
        { message: "Image URL is missing after upload" },
        { status: 500 }
      );
    }

    const newBook = new Book({
      title,
      author,
      description,
      price,
      rating,
      genre,
      imageUrl: uploadedImageUrl,
      addedBy: (decoded as jwt.JwtPayload).email,
    });

    await newBook.save();

    return NextResponse.json(
      { message: "Book added successfully", book: newBook },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error: (error as Error).message },
      { status: 500 }
    );
  }
}
