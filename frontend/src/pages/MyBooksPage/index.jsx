import { useState } from "react";
import Input from "../../components/Input";
import { useWriteStore } from "../../store/writeStore";
import { motion } from "framer-motion";
import { Book, LoaderPinwheel } from "lucide-react";
import toast from 'react-hot-toast';

const MyBooksPage = () => {
  const [ title, setTitle ] = useState('');
  const { createBook, error, isLoading } = useWriteStore();

  const handleCreate = async (e) => {
    e.preventDefault();
  
    try {
      if (!title.trim()) {
        throw new Error("Title cannot be empty.");
      }
      await createBook(title);
      toast.success("Archivo en blanco creado con exito")
    } catch (error) {
      toast.error(error.response.data.message || "Error al crear cuento");
      console.error("Error al crear libro: ", error);
    }
  }
  
  return (
    <div>
      <h2> Nuevo Libro </h2>
      <Input
          type="text"
          icon={Book}
          placeholder="Titulo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
      />
      <motion.button
            className="mt-5 w-full py-3 px-4 bg-blue-500 text-white font-bold rounded-lg shadow-lg border border-black hover:bg-black hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:ring-offset-slate-100 transition duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCreate}
            disabled={isLoading}
          >
            {isLoading ? (
              <LoaderPinwheel className="w-6 h-6 animate-spin mx-auto" />
            ) : (
              "Escribir historia"
            )}
          </motion.button>
    </div>
  )
}

export default MyBooksPage