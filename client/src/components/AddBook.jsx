import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { gql } from '@apollo/client';
const GET_AUTHORS_QUERY = gql`
  {
    authors {
      id,
      name
    }
  }
`;
export const GET_BOOKS_QUERY = gql`
  {
    books {
      id,
      name,
      genre
      author {
        id,
        name,
        age
      }
    }
  }
`;
const ADD_BOOK_MUTATION = gql`
  mutation AddBook($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      id,
      name,
      genre
      author {
        id,
        name,
        age
      }
    }
  }
`;
const AddBook = () => {
    const { loading, error, data } = useQuery(GET_AUTHORS_QUERY);
    const [addBook] = useMutation(ADD_BOOK_MUTATION);
    const [bookName, setBookName] = useState('');
    const [genre, setGenre] = useState('');
    const [authorId, setAuthorId] = useState('');
    if (loading) return <p className="text-gray-500">Loading authors...</p>;
    if (error) return <p className="text-red-500">Error 😢</p>;
    const handleSubmit = async (e) => {
        e.preventDefault();
        await addBook({
            variables: {
                name: bookName,
                genre,
                authorId,
            },
            refetchQueries: [{ query: GET_BOOKS_QUERY }],
        });
        setBookName('');
        setGenre('');
        setAuthorId('');
    };
    return (
        <div className="mt-20 max-w-lg mx-auto">
            <div className="backdrop-blur-xl bg-white/80 border border-white/40 rounded-3xl shadow-2xl p-10">
                <h2 className="text-3xl font-extrabold text-center mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    ➕ Add a New Book
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block mb-2 font-semibold text-gray-700">
                            Book Name
                        </label>
                        <input
                            className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none transition"
                            type="text"
                            value={bookName}
                            onChange={(e) => setBookName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-semibold text-gray-700">
                            Genre
                        </label>
                        <input
                            className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none transition"
                            type="text"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-semibold text-gray-700">
                            Author
                        </label>
                        <select
                            className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none transition"
                            value={authorId}
                            onChange={(e) => setAuthorId(e.target.value)}
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
                        className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-[1.02] hover:shadow-xl transition"
                    >
                        Add Book 🚀
                    </button>
                </form>
            </div>
        </div>
    );
};
export default AddBook;