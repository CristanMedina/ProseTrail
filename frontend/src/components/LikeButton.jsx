import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useWriteStore } from '../store/writeStore';
import { useAuthStore } from '../store/authStore';

const LikeButton = () => {
  const { book, toggleLikeBook, isLoading } = useWriteStore();
  const { user, isAuthenticated } = useAuthStore();

  const navigate = useNavigate();

  const isLiked = useMemo(() => {
    if (!user || !book?.likes) return false;
    return book.likes.includes(user._id);
  }, [book?.likes, user]);

  const likeCount = useMemo(() => {
    return book?.likes?.length || 0;
  }, [book?.likes]);

  const handleLikeClick = async () => {
    if (!isAuthenticated) {
      toast.error("Debes iniciar sesión para dar like.");
      navigate('/login');
      return;
    }

    if (isLoading) return;

    try {
      await toggleLikeBook(book._id);
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!book) return null;

  return (
    <div className="flex items-center space-x-2">
      <motion.button
        onClick={handleLikeClick}
        disabled={isLoading}
        className={`flex items-center justify-center p-2 rounded-full transition-colors ${
          isLiked ? 'text-red-500 bg-red-100' : 'text-gray-500 bg-gray-200'
        } disabled:opacity-50`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Heart size={18} />
      </motion.button>
      <span className="font-semibold text-lg text-gray-700">{likeCount}</span>
    </div>
  );
};

export default LikeButton;
