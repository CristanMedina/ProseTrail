import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { NotebookPenIcon, LoaderPinwheel } from "lucide-react";
import { useWriteStore } from "../store/writeStore";
import toast from 'react-hot-toast';

const CreateBookForm = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const { createBook, isLoading, getBooks } = useWriteStore();
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      if (!title.trim()) {
        throw new Error("El titulo no puede estar vacio.");
      }
      const createdBook = await createBook(title);

      if(createdBook && createdBook._id){
        toast.success("Documento en blanco creado con éxito");
      onClose();
      navigate(`/escritura/${createdBook._id}`);
      } else {
        throw new Error("Libro creado, pero no se encontró el _id");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al crear cuento");
      console.error("Error al crear libro: ", error);
    }
  }

  return (
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
  );
}

export default CreateBookForm;
