import React from 'react';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import AddBook from './AddBook';
const GET_BOOKS_QUERY = gql`
  {
    books {
      id
      name
      genre
      author {
        id
        name
        age
      }
    }
  }
`;
const BookList = () => {
  const { loading, error, data } = useQuery(GET_BOOKS_QUERY);
  if (loading) return <p className="text-gray-500">Loading books...</p>;
  if (error) return <p className="text-red-500">Error 😢</p>;
  return (
    <div className="max-w-5xl mx-auto my-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Book List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.books.map((book) => (
          <div
            key={book.id}
            className="p-4 bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-gray-800">{book.name}</h3>
            <p className="text-gray-600"><span className="font-medium">Genre:</span> {book.genre}</p>
            <p className="text-gray-600">
              <span className="font-medium">Author:</span> {book.author?.name || 'Unknown'} —{' '}
              <span className="font-medium">Age:</span> {book.author?.age || 'N/A'}
            </p>
          </div>
        ))}
      </div>
      <AddBook />
    </div>
  );
};
export default BookList;