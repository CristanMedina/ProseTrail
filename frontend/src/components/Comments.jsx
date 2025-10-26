import { useState } from 'react';
import { useWriteStore } from '../store/writeStore';
import { useAuthStore } from '../store/authStore';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { SendHorizontal, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Comments = () => {
  const { book, isLoading, addComment, deleteComment } = useWriteStore();
  const { isAuthenticated, user } = useAuthStore();
  const [text, setText] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    if (!isAuthenticated) {
      toast.error("Debes iniciar sesión para comentar");
      navigate('/login');
      return;
    }

    try {
      await addComment(book._id, text);
      setText('');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (commentId) => {
    if (isLoading) return;

    try {
      await deleteComment(book._id, commentId);
      toast.success("Comentario eliminado");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="mt-12 pt-8 border-t border-indigo-200">
      <h3 className="text-2xl font-bold font-oswald text-gray-800 mb-6">Comentarios</h3>

      {isAuthenticated && (
        <form onSubmit={handleSubmit} className="mb-8 flex space-x-3">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`Escribe un comentario como ${user.name}...`}
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows="2"
            disabled={isLoading}
          />
          <motion.button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-semibold hover:bg-indigo-700 disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SendHorizontal size={18} />
          </motion.button>
        </form>
      )}

      <div className="space-y-6">
        {book.reviews && book.reviews.length > 0 ? (
          book.reviews.map((review) => {
            const isCommentAuthor = isAuthenticated && review.user.toString() === user._id;
            const isBookAuthor = isAuthenticated && book.author === user.name;
            const canDelete = isCommentAuthor || isBookAuthor;

            return (
              <div key={review._id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <span className="font-semibold text-indigo-700">{review.name}</span>
                    <span className="text-xs text-gray-500 ml-3">
                      {new Date(review.createdAt).toLocaleString('es-MX', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  {canDelete && (
                    <motion.button
                      onClick={() => handleDelete(review._id)}
                      disabled={isLoading}
                      className="text-gray-400 hover:text-red-500 disabled:opacity-50"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  )}
                </div>
                <p className="text-gray-700 whitespace-pre-wrap">{review.text}</p>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-center">Sé el primero en comentar.</p>
        )}
      </div>
    </div>
  );
};

export default Comments;
