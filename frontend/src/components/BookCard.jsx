import { motion } from "framer-motion";

const BookCard = ({ book, onClick, onInfoClick }) => {
  const coverUrl = book.coverImage
    ? `/covers/${book.coverImage.replace(/\\/g, "/")}`
    : null;

  const handleInfoClick = (e) => {
    e.stopPropagation();
    if (onInfoClick) {
      onInfoClick(book);
    }
  };

  return (
    <motion.div
      onClick={onClick}
      className="w-48 h-64 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col justify-between relative"
      style={{
        backgroundImage: coverUrl ? `url(${coverUrl})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: coverUrl ? undefined : "#bfdbfe",
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {onInfoClick && (
        <motion.button
          onClick={handleInfoClick}
          className="absolute top-2 right-2 z-10 w-6 h-6 bg-white bg-opacity-70 rounded-full flex items-center justify-center text-blue-800 shadow-md"
          whileHover={{ scale: 1.2, backgroundColor: "rgba(255, 255, 255, 1)" }}
          whileTap={{ scale: 0.9 }}
          title="Ver más información"
        >
          <span className="font-bold text-sm italic">i</span>
        </motion.button>
      )}

      <div
        className="text-center bg-white bg-opacity-80 rounded-md p-1"
        style={{ backdropFilter: "blur(4px)" }}
      >
        <h3 className="text-lg font-semibold text-blue-900 mb-2 truncate" title={book.title}>
          {book.title}
        </h3>
        <p className="text-xs text-blue-500 font-medium truncate" title={book.author}>
          {book.author}
        </p>
      </div>

      <div className="mt-2 text-[10px] text-blue-700 space-y-1 bg-white bg-opacity-80 rounded-md p-1 max-h-24 overflow-auto">
        <p>
          <span className="font-semibold">Creado:</span>
          <br />
          {new Date(book.createdAt).toLocaleDateString("es-MX", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p>
          <span className="font-semibold">Actualizado:</span>
          <br />
          {new Date(book.updatedAt).toLocaleDateString("es-MX", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {book.genres && book.genres.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2 bg-white bg-opacity-80 rounded-md p-1 max-h-12 overflow-auto">
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
