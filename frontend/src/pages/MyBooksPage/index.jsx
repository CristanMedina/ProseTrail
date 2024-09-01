import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { motion } from "framer-motion";
import { NotebookPenIcon, Book, LoaderPinwheel, BookPlus } from "lucide-react";
import { useWriteStore } from "../../store/writeStore";
import Modal from "../../components/Modal";
import BookCard from "../../components/BookCard";

const MyBooksPage = () => {
  const [title, setTitle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { createBook, isLoading, books, getUserBooks } = useWriteStore();
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("User ID: ", userId);
    if(userId){
      getUserBooks(userId);
    }
  }, [userId, getUserBooks]);

  const handleCreate = async (e) => {
    e.preventDefault();
  
    try {
      if (!title.trim()) {
        throw new Error("Title cannot be empty.");
      }
      await createBook(title);
      toast.success("Archivo en blanco creado con éxito");
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al crear cuento");
      console.error("Error al crear libro: ", error);
    }
  }

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
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-4 font-sourceCodePro font-medium"
          >
            <h2 className="text-xl font-bold mb-4">Nuevo Libro</h2>
            <NotebookPenIcon/>
            <input
              type="text"
              placeholder="Titulo"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full pl-10 pr-3 py-2 bg-white bg-opacity-50 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-500 placeholder:font-semibold transition duration-200 font-raleway mb-4"
            />
            <motion.button
              className="w-full py-3 px-4 bg-blue-500 text-white font-bold rounded-lg shadow-lg border border-blue-300 hover:bg-blue-700 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:ring-offset-slate-100 transition duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCreate}
              disabled={isLoading}
            >
              {isLoading ? (
                <LoaderPinwheel className="w-6 h-6 animate-spin mx-auto" />
              ) : (
                "Crear"
              )}
            </motion.button>
          </motion.div>
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