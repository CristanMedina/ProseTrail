import { useState } from "react";
import { useWriteStore } from "../../store/writeStore";
import { motion } from "framer-motion";
import { NotebookPenIcon, Book, LoaderPinwheel, BookPlus} from "lucide-react";
import toast from 'react-hot-toast';
import Modal from "../../components/Modal";

const MyBooksPage = () => {
  const [title, setTitle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { createBook, error, isLoading } = useWriteStore();

  const handleCreate = async (e) => {
    e.preventDefault();
  
    try {
      if (!title.trim()) {
        throw new Error("Title cannot be empty.");
      }
      await createBook(title);
      toast.success("Archivo en blanco creado con exito");
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al crear cuento");
      console.error("Error al crear libro: ", error);
    }
  }

  return (
    <div className="flex flex-col">
    <div className="flex gap-6 font-bold">
      <h1 className="text-2xl font-cinzel pb-6">Mis Libros</h1>
      <Book/>
    </div>
      <div className="flex justify-center gap-5">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center py-24 px-6 bg-blue-400 hover:bg-blue-700 backdrop-blur-lg opacity-50 text-white rounded-lg shadow-lg transition-transform transform hover:scale-105"
        >
          <BookPlus className="w-6 h-6 mr-2" />
          <span className="font-bold font-sourceCodePro">Nuevo Libro</span>
        </button>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="flex gap-4 font-sourceCodePro font-medium">
            <h2 className="text-xl font-bold mb-4">Nuevo Libro</h2>
            <NotebookPenIcon/>
          </div>
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
        </Modal>

        <div className="book-list">
          
        </div>

      </div>
    </div>
  )
}

export default MyBooksPage;

