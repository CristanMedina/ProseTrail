import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { useAuthStore } from '../../store/authStore';
import { formatDate } from '../../utils/date';
import { LogOut, Mail, Calendar, Clock } from 'lucide-react';
import BookCard from '../../components/BookCard';
import { useEffect } from 'react';
import { useWriteStore } from '../../store/writeStore';

const ProfilePage = () => {
  const { user, logout } = useAuthStore();
  const { books, getUserBooks } = useWriteStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (user?._id) {
      getUserBooks(user._id);
    }
  }, [user, getUserBooks]);

  const handleLogout = () => {
    logout();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl w-full mx-auto mt-16 p-10 bg-gradient-to-br from-slate-100/70 to-slate-200/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-slate-300/40"
    >
      {/* Encabezado */}
      <h2 className="text-5xl font-serif font-bold mb-10 text-center text-slate-800">
        Bienvenido, <span className="bg-gradient-to-r from-cyan-400 to-cyan-700 text-transparent bg-clip-text">{user.name}</span>
      </h2>

      {/* Información del Usuario */}
      <motion.div
        className="p-6 bg-white/90 rounded-xl border border-slate-300/30 shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <h3 className="text-2xl font-semibold text-cyan-600 mb-5 border-b pb-3 border-slate-300">
          Información del Escritor
        </h3>

        <div className="flex items-center gap-2 mb-3 text-slate-700">
          <Mail size={18} className="text-cyan-500" />
          <span className="text-sm"><span className="font-semibold">Correo:</span> {user.email}</span>
        </div>

        <div className="flex items-center gap-2 mb-2 text-slate-700 text-sm">
          <Calendar size={18} className="text-cyan-500" />
          <span>
            <span className="font-semibold">Se unió:</span>{" "}
            {new Date(user.createdAt).toLocaleDateString("es-MX", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>

        <div className="flex items-center gap-2 text-slate-700 text-sm">
          <Clock size={18} className="text-cyan-500" />
          <span>
            <span className="font-semibold">Última vez activo:</span>{" "}
            {user.lastLogin ? formatDate(user.lastLogin) : "Acaba de crear su cuenta"}
          </span>
        </div>
      </motion.div>

      {/* Sección de Libros del Usuario */}
      <motion.div
        className="mt-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <h3 className="text-2xl font-serif text-cyan-700 mb-6 border-b pb-2 border-cyan-300">
          Mis Libros
        </h3>

        {Array.isArray(books) && books.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {books.map((book) => (
              <BookCard book={book} onClick={() => navigate(`/escritura/${book._id}`)} />
            ))}
          </div>
        ) : (
          <p className="text-slate-600 italic">Aún no has publicado ningún LIBRO...</p>
        )}
      </motion.div>

      {/* Botón de Cerrar Sesión */}
      <motion.div
        className="mt-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-cyan-500 to-cyan-700 text-white font-semibold rounded-xl shadow-lg hover:from-cyan-600 hover:to-cyan-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition duration-200"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
        >
          <LogOut size={18} /> Cerrar Sesión
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
export default ProfilePage;
