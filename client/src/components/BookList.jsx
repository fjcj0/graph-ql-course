import React from 'react';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
const GET_BOOKS_QUERY = gql`
  {
    books {
      id,
      name,
      genre,
      author {
        id,
        name,
        age
      }
    }
  }
`;
const BookList = () => {
  const { loading, error, data } = useQuery(GET_BOOKS_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error 😢</p>;
  return (
    <div>
      <ul>
        {data.books.map(book => (
          <li key={book.id}>
            name: {book.name} — Genre: {book.genre}
            <br />
            author: {book.author.name} - age: {book.author.age}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default BookList;