import { useEffect, useState } from "react";
import { useWriteStore } from '../../store/writeStore';
import { motion } from "framer-motion";
import BookCard from "../../components/BookCard";
import { useNavigate } from "react-router-dom";

const RecentBooks = () => {
  const { books, getAllBooks, isLoading, error } = useWriteStore();
  const [recentBooks, setRecentBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      await getAllBooks();
    };
    fetchBooks();
  }, [getAllBooks]);

  useEffect(() => {
    if (books.length > 0) {
      const latestBooks = books.slice(-3).reverse();
      setRecentBooks(latestBooks);
    }
  }, [books]);

  const handleBookClick = (bookId) => {
    navigate(`/libro/${bookId}`);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.8 }}
      className="w-full max-w-4xl mb-20 mx-auto"
    >
      <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center font-oswald">Libros Recientes</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {recentBooks.map((book, index) => (
          <motion.div
            key={book._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="cursor-pointer"
            onClick={() => handleBookClick(book._id)}
          >
            <BookCard book={book} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default RecentBooks;
