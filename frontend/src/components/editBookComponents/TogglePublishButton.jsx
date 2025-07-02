import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useWriteStore } from '../../store/writeStore';

const TogglePublishButton = ({ book, onStatusChange }) => {
  const { updateBook } = useWriteStore();

  const toggleStatus = async () => {
    const newStatus = book.status === "En progreso" ? "Terminado" : "En progreso";

    try {
      const updatedBook = await updateBook(book._id, { status: newStatus });
      toast.success(`Estado cambiado a "${newStatus}"`);
      onStatusChange(updatedBook);
    } catch (error) {
      toast.error("No se pudo cambiar el estado del libro");
      console.error("Error updating book status:", error);
    }
  };

  return (
    <motion.button
      onClick={toggleStatus}
      className={`mb-2 p-3 rounded-3xl font-semibold transition duration-200 ${
        book.status === "En progreso"
          ? "text-green-700 bg-green-200 hover:bg-green-400 hover:text-green-50"
          : "text-yellow-700 bg-yellow-200 hover:bg-yellow-400 hover:text-yellow-50"
      }`}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {book.status === "En progreso" ? "Publicar" : "Volver a privado"}
    </motion.button>
  );
};

export default TogglePublishButton;
