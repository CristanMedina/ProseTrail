import Modal from './Modal';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const BookInfoModal = ({ book, isOpen, onClose }) => {
  const navigate = useNavigate();
  if (!book) return null;

  const coverUrl = book.coverImage
    ? `/covers/${book.coverImage.replace(/\\/g, "/")}`
    : null;

  const handleNavigate = () => {
    onClose();
    navigate(`/libro/${book._id}`);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4 p-2">
        <h2 className="text-2xl font-bold font-oswald">{book.title}</h2>
        <p className="text-md text-gray-600 -mt-2">por {book.author}</p>

        {coverUrl && (
          <img
            src={coverUrl}
            alt={`Portada de ${book.title}`}
            className="w-full h-48 object-cover rounded-lg shadow-md"
          />
        )}

        <div className="max-h-48 overflow-y-auto pr-2">
          <p className="text-sm text-gray-800 whitespace-pre-wrap">
            {book.description || "Este libro aún no tiene descripción."}
          </p>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition-colors"
            onClick={onClose}
          >
            Cerrar
          </button>
          <motion.button
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 font-semibold"
            onClick={handleNavigate}
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.03 }}
          >
            Ir al libro
          </motion.button>
        </div>
      </div>
    </Modal>
  );
};

export default BookInfoModal;
