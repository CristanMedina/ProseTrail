import { useWriteStore } from "../store/writeStore";
import { BookOpen } from "lucide-react";

const BooksList = () => {
const { book, error } = useWriteStore();

  if (error) {
    return <p className="text-red-500">Error fetching books: {error.message}</p>;
  }

  if (book.length === 0) {
    return <p>No books found. Start by creating one!</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {book.map((books) => (
        <div key={books.id} className="bg-white p-4 rounded-lg shadow-lg">
          <div className="flex items-center mb-2">
            <BookOpen className="w-6 h-6 text-blue-500 mr-2" />
            <h3 className="font-bold text-lg">{books.title}</h3>
          </div>
          <p className="text-gray-700">{books.description}</p>
        </div>
      ))}
    </div>
  );
};

export default BooksList;
