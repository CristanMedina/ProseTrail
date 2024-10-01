import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { useWriteStore } from '../../store/writeStore';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';

const DeleteBookButton = ({ book }) => {
    const { deleteBook, isLoading } = useWriteStore();
    const { user } = useAuthStore();
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (!book || !book._id) {
            toast.error("No se pudo encontrar el libro para eliminar.");
            return;
        }

        try {
            await deleteBook(book._id);
            toast.success("Libro eliminado con éxito.");
        } catch (error) {
            console.error('Error details:', error);
        } finally {
            navigate(`/mis-libros/${user?._id}`);
        }
    };

    return (
        <div>
            <motion.button
                className="mb-2 p-3 rounded-3xl font-semibold text-rose-700 bg-rose-200 hover:bg-rose-400 hover:text-rose-50 transition duration-200"
                onClick={handleDelete}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
               {isLoading ? 'Eliminando...' : 'Eliminar'}
            </motion.button>
        </div>
    );
};

export default DeleteBookButton;
