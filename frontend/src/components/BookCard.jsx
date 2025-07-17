import { motion } from 'framer-motion';

const BookCard = ({ book, onClick }) => {
  return (
    <motion.div
      className="w-48 h-64 p-4 bg-blue-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col justify-between"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <div className="text-center">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          {book.title}
        </h3>
        <p className="text-xs text-blue-500 font-medium">{book.author}</p>
      </div>

      <div className="mt-2 text-[10px] text-blue-700 space-y-1">
        <p><span className="font-semibold">Creado:</span><br /> {new Date(book.createdAt).toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" })}</p>
        <p><span className="font-semibold">Actualizado:</span><br /> {new Date(book.updatedAt).toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" })}</p>
      </div>

      {book.genres && book.genres.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {book.genres.map((genre, index) => (
            <span
              key={index}
              className="bg-blue-200 text-blue-800 text-[10px] px-2 py-0.5 rounded-full"
            >
              {genre}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default BookCard;
