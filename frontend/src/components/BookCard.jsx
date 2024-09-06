import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpenIcon } from 'lucide-react';
import { formatDate } from '../utils/date';

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
      <div className="flex flex-col items-center justify-center h-full">
        <h3 className="text-lg font-semibold text-center text-blue-900 p-5">{book.title}</h3>
        <div className='text-xs text-blue-400'>
          <p> <span className='font-bold'>Creado: </span> 
                {new Date(book.createdAt).toLocaleDateString("es-MX", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  })
                }
          </p>
          <p> <span className='font-bold'>Ultima actualizacion: </span> 
                {new Date(book.updatedAt).toLocaleDateString("es-MX", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  })
                }
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default BookCard