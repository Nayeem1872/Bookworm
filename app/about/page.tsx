"use client";

import Navbar from "../components/Navbar";

export default function About() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-12 ">
        <div className="max-w-3xl mx-auto text-center mt-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            About Bookworm
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Welcome to <span className="font-semibold">Bookworm</span>, your
            digital bookshelf! Bookworm is an online platform designed for
            **storing, exploring, and managing books** effortlessly. Whether you
            are an avid reader, a researcher, or someone who loves collecting
            books, Bookworm helps you organize your collection in a structured
            and easy-to-use system.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900">
              📚 Store Your Books
            </h2>
            <p className="text-gray-700 mt-3">
              Easily add and manage your books with details like title, author,
              price, rating, and genre.
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900">
              🔍 Search & Filter
            </h2>
            <p className="text-gray-700 mt-3">
              Use powerful search and filter options to find books based on
              their **price, rating, and genre**.
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900">
              🌟 Personalized Collection
            </h2>
            <p className="text-gray-700 mt-3">
              Keep track of books you’ve added, and organize them efficiently
              for better accessibility.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-semibold text-gray-900">
            Start Building Your Digital Library Today!
          </h2>
          <p className="text-gray-700 mt-4">
            Join <span className="font-semibold">Bookworm</span> and make book
            management effortless.
          </p>
        </div>
      </div>
    </>
  );
}
