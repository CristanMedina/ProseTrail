import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BookCard from "../../components/BookCard";
import { useWriteStore } from '../../store/writeStore';
import LoadingSpinner from "../../components/LoadingSpinner";
import { motion } from "framer-motion";

const LibraryPage = () => {
  const { books, getAllBooks } = useWriteStore();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    getAllBooks()
      .catch((error) => {
        console.error("Error al cargar libros: ", error);
      })
      .finally(() => setLoading(false));
  }, [location.pathname]);

  const handleBookClick = (bookId) => {
    navigate(`/libro/${bookId}`);
  };

  const filteredBooks = books?.filter(
    book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (loading) return <LoadingSpinner />;

  if (!books || books.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 mt-10 text-center text-gray-500">
        No hay libros disponibles
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Biblioteca</h1>

      <input
        type="text"
        placeholder="Buscar por título o autor..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="w-full max-w-md mx-auto mb-8 p-3 border border-gray-300 rounded-md block"
      />

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {filteredBooks.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            No se encontraron libros para "{searchTerm}"
          </div>
        ) : (
          filteredBooks.map((book, index) => (
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
          ))
        )}
      </motion.div>
    </div>
  );
};

export default LibraryPage;
