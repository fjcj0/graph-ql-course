import BookList from './components/BookList';
function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100 p-8">
      <h1 className="text-center text-5xl font-extrabold mb-14">
        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          LeetCoding’s Reading Book
        </span>
      </h1>

      <BookList />
    </div>
  );
}
export default App;