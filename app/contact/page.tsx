"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";


export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-12 ">
        <div className="max-w-3xl mx-auto text-center mt-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Contact Us</h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Have questions, feedback, or need support? Reach out to us at **Bookworm**!
            Fill out the form below, and we’ll get back to you as soon as possible.
          </p>
        </div>


        <div className="mt-12 max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
          {submitted ? (
            <p className="text-green-600 text-center font-semibold text-lg">
              ✅ Thank you! We have received your message.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
      
              <div>
                <label className="block font-medium text-gray-800">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full mt-2 p-3 border rounded-md focus:ring focus:ring-blue-200"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-800">Your Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full mt-2 p-3 border rounded-md focus:ring focus:ring-blue-200"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-800">Your Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full mt-2 p-3 border rounded-md focus:ring focus:ring-blue-200"
                  placeholder="Type your message..."
                  rows={4}
                ></textarea>
              </div>

       
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
          )}
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-900">📩 Reach me Directly</h2>
          <p className="text-gray-700 mt-2">Email: <a href="hasibul.islam.1872@gmail.com" className="text-blue-600 hover:underline">hasibul.islam.1872@gmail.com</a></p>
          <p className="text-gray-700 mt-2">Phone:01845588514</p>

          
        </div>
      </div>
    </>
  );
}
