import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { useWriteStore } from '../../store/writeStore';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';
import Modal from '../Modal';
import { useState } from 'react';

const DeleteBookButton = ({ book }) => {
    const { deleteBook, isLoading } = useWriteStore();
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = async () => {
        if (!book || !book._id) {
            toast.error("No se pudo encontrar el libro para eliminar.");
            return;
        }

        try {
            await deleteBook(book._id);
            toast.success("Libro eliminado con éxito.");
            navigate(`/mis-libros/${user?._id}`);
        } catch (error) {
            console.error('Error details:', error);
        } finally {
            setIsModalOpen(false);
        }
    };

    return (
        <div>
            <motion.button
                className="mb-2 p-3 rounded-3xl font-semibold text-rose-700 bg-rose-200 hover:bg-rose-400 hover:text-rose-50 transition duration-200"
                onClick={() => setIsModalOpen(true)}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
                Eliminar
            </motion.button>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2 className="text-lg font-bold">¿Estás seguro?</h2>
                <p className="text-gray-600">El documento sera eliminado de forma permanente</p>
                <div className="flex justify-end space-x-4 mt-4">
                    <button
                        className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                        onClick={() => setIsModalOpen(false)}
                    >
                        Regresar
                    </button>
                    <button
                        className="px-4 py-2 rounded bg-rose-500 text-white hover:bg-rose-600"
                        onClick={handleDelete}
                    >
                        {isLoading ? 'Eliminando...' : 'Eliminar'}
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default DeleteBookButton;
