import { useEffect, useState } from "react";
import { useWriteStore } from '../../store/writeStore';
import { motion } from "framer-motion";
import { Book } from 'lucide-react';
import SliderButton from './SliderButton';
import { useNavigate } from "react-router-dom";

const RecentBooks = () => {
  const { books, getAllBooks, isLoading, error } = useWriteStore();
  const [currentIndex, setCurrentIndex] = useState(0);
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

  const nextSlide = () => {
    if (currentIndex < recentBooks.length - 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.8 }}
      className="w-full max-w-4xl mb-20"
    >
      <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center font-oswald">Libros Recientes</h2>
      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}
          >
            {recentBooks.map((book) => (
              <div key={book.id} className="w-1/3 flex-shrink-0 p-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-6 rounded-lg shadow-md h-full"
                >
                  <Book className="w-16 h-16 mb-4 text-blue-600 mx-auto"
                  onClick={() => handleBookClick(book._id)}/>
                  <h3 className="text-xl font-bold mb-2 text-center">{book.title}</h3>
                  <p className="text-gray-600 text-center">{book.author}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
        <SliderButton direction="left" onClick={prevSlide} disabled={currentIndex === 0} />
        <SliderButton direction="right" onClick={nextSlide} disabled={currentIndex >= recentBooks.length - 3} />
      </div>
    </motion.section>
  );
};

export default RecentBooks;
