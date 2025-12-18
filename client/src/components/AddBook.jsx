import React, { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { gql } from '@apollo/client';
const GET_AUTHORS_QUERY = gql`
  {
    authors {
      id
      name
    }
  }
`;
const AddBook = () => {
    const { loading, error, data } = useQuery(GET_AUTHORS_QUERY);
    const [bookName, setBookName] = useState('');
    const [genre, setGenre] = useState('');
    const [authorId, setAuthorId] = useState('');
    if (loading) return <p className="text-gray-500">Loading authors...</p>;
    if (error) return <p className="text-red-500">Error 😢</p>;
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ bookName, genre, authorId });
    };
    return (
        <div className="my-10 mx-auto max-w-md p-6 bg-white rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Add a New Book</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-gray-600 font-medium">Book Name:</label>
                    <input
                        type="text"
                        value={bookName}
                        onChange={(e) => setBookName(e.target.value)}
                        required
                        className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div>
                    <label className="block text-gray-600 font-medium">Genre:</label>
                    <input
                        type="text"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        required
                        className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div>
                    <label className="block text-gray-600 font-medium">Author:</label>
                    <select
                        value={authorId}
                        onChange={(e) => setAuthorId(e.target.value)}
                        required
                        className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">Select Author</option>
                        {data.authors.map((author) => (
                            <option key={author.id} value={author.id}>
                                {author.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                >
                    Add Book
                </button>
            </form>
        </div>
    );
};
export default AddBook;