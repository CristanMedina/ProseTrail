import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BookCard from "../../components/BookCard";
import { useWriteStore } from '../../store/writeStore';
import { motion } from "framer-motion";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const LibraryPage = () => {
  const { books, getAllBooks } = useWriteStore();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loadBooks = async () => {
      try {
        await getAllBooks();
      } catch (error) {
        console.error("Error al cargar libros en la biblioteca: ", error);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [getAllBooks]);

  useEffect(() => {
    document.title = `biblioteca | Prose Trail`;

    return () => {
      document.title = 'Prose Trail';
    };
  }, [location]);

  const handleBookClick = (bookId) => {
    navigate(`/libro/${bookId}`);
  };

  if (loading) {
    return <div>Loading books...</div>;
  }

  if (!books || books.length === 0) {
    return <div>No books available</div>;
  }

  return (
    <>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {books.map((book) => (
          <motion.div
            key={book._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: books.indexOf(book) * 0.1 }}
            onClick={() => handleBookClick(book._id)}
            className="cursor-pointer"
          >
            <BookCard book={book} />
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

export default LibraryPage;
