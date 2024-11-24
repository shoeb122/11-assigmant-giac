"use client";
import { useEffect, useState } from "react";

export default function Page() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Array of background colors for the posts
  const postBackgroundColors = [
    "bg-blue-100",
    "bg-green-100",
    "bg-red-100",
    "bg-yellow-100",
    "bg-purple-100",
    "bg-pink-100",
    "bg-indigo-100",
    "bg-teal-100",
  ];

  
  const buttonColors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-red-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
  ];

  useEffect(() => {
    setLoading(true);
    fetch("/api/external")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPosts(data.data);
        } else {
          setError(data.message);
        }
      })
      .catch(() => setError("An unexpected error occurred"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500 border-solid"></div>
          <p className="text-blue-500 mt-4 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-red-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">Error</h1>
          <p className="text-red-700 mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Latest Posts
      </h1>
      <ul className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post: any, index) => (
          <li
            key={index}
            className={`relative p-6 border rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 ${
              postBackgroundColors[index % postBackgroundColors.length]
            }`} // Dynamic background color for each post
          >
            {/* Post Title */}
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">{post.title}</h2>
            {/* Post Body */}
            <p className="text-gray-600 mb-4 line-clamp-3">{post.body}</p>
            
            <button
              className={`px-4 py-2 text-white rounded-md hover:bg-opacity-90 transition-all ${
                buttonColors[index % buttonColors.length] 
              }`}
            >
              Read More
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
