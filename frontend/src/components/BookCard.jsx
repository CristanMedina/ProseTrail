import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpenIcon } from 'lucide-react';

const BookCard = ({book}) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/edit/${book.id}`);
  };

  return (
    <motion.div
      className="w-48 h-64 p-4 bg-blue-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleEditClick}
    >
      <div className="flex items-center justify-center h-full">
        <BookOpenIcon className="w-8 h-8 text-blue-600 mb-4" />
        <h3 className="text-lg font-semibold text-center text-blue-900">{book.title}</h3>
      </div>
    </motion.div>
  );
}

export default BookCard