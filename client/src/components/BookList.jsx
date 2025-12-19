import React from 'react';
import { useQuery } from '@apollo/client/react';
import AddBook, { GET_BOOKS_QUERY } from './AddBook';
const BookList = () => {
  const { loading, error, data } = useQuery(GET_BOOKS_QUERY);
  if (loading) return <p className="text-gray-500">Loading books...</p>;
  if (error) return <p className="text-red-500">Error 😢</p>;
  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
        📖 Book Collection
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.books.map((book) => (
          <div
            key={book.id}
            className="relative group bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition" />

            <h3 className="relative text-2xl font-bold text-gray-800">
              {book.name}
            </h3>

            <p className="relative mt-3 text-gray-600">
              <span className="font-semibold">Genre:</span> {book.genre}
            </p>

            <p className="relative mt-1 text-gray-600">
              <span className="font-semibold">Author:</span>{" "}
              {book.author?.name || "Unknown"}{" "}
              {book.author?.age && (
                <span className="text-sm text-gray-400">
                  ({book.author.age} yrs)
                </span>
              )}
            </p>
          </div>
        ))}
      </div>

      <AddBook />
    </div>
  );
};
export default BookList;