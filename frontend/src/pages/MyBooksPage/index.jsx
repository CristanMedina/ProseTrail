import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Book, BookPlus } from "lucide-react";
import { useWriteStore } from "../../store/writeStore";
import Modal from "../../components/Modal";
import BookCard from "../../components/BookCard";
import CreateBookForm from "../../components/CreateBookForm";

const MyBooksPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { books, getUserBooks } = useWriteStore();
  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("User ID: ", userId);
    if(userId){
      getUserBooks(userId);
    }
  }, [userId, getUserBooks]);

  useEffect(() => {
    document.title = `mis libros | Prose Trail`;

    return () => {
      document.title = 'Prose Trail';
    };
  }, [location]);

  const handleBookClick = (bookId) => {
    navigate(`/escritura/${bookId}`);
  }

  return (
    <div className="flex flex-col">
      <div className="flex gap-6 font-bold">
        <h1 className="text-2xl font-cinzel pb-6">Mis Libros</h1>
        <Book/>
      </div>

      <div className="flex justify-center gap-5">
        <motion.button
          onClick={() => setIsModalOpen(true)}
          className="flex flex-col items-center justify-center bg-blue-400 hover:bg-blue-700 backdrop-blur-lg opacity-90 text-white rounded-lg shadow-lg transition-transform transform hover:scale-105 w-[200px] h-[260px] mt-7"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <BookPlus className="w-8 h-8 mb-2" />
          <span className="font-bold font-sourceCodePro text-lg">Nuevo Libro</span>
        </motion.button>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          className="transition-opacity duration-300 ease-in-out"
        >
          <CreateBookForm onClose={() => setIsModalOpen(false)} />
        </Modal>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {books.map((book) => (
            <motion.div
              key={book.id}
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
      </div>
    </div>
  );
}

export default MyBooksPage;
