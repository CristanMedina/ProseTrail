import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useWriteStore } from '../../store/writeStore';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const BookPage = () => {
  const { bookId } = useParams();
  const { book, getBookById, isLoading } = useWriteStore();

  useEffect(() => {
    const loadBook = async () => {
      try {
        await getBookById(bookId);
      } catch (error) {
        console.error('Error al cargar libro:', error.response?.data?.message || error.message);
      }
    };
    if (!book && !isLoading) {
      loadBook();
    }
  }, [bookId, book, getBookById, isLoading]);

  useDocumentTitle(`leyendo | ${book?.title}`);

  return (
    <motion.div
      className='flex flex-col min-h-screen w-1/2 mx-auto p-10 m-4 bg-indigo-100 bg-opacity-30 backdrop-blur-2xl backdrop-opacity-80 rounded-3xl shadow-2xl'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
    >
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          {/* Title Animation */}
          <motion.h1
            className='font-cinzel font-bold text-4xl mb-3 text-center'
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            {book?.title}
          </motion.h1>

          {/* Author and Date Animation */}
          <motion.div
            className='flex justify-between'
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <h2 className='font-raleway font-semibold text-lg text-indigo-600'>
              <span className='text-slate-800 mx-2 text-sm'>Author: </span>
              {book?.author}
            </h2>
            <div className='text-sm font-sourceCodePro'>
              <p>Publicado: {book?.publishedDate}</p>
            </div>
          </motion.div>

          {/* Enhanced Scroll-triggered Content Animation */}
          <motion.div
            className='p-4 text-justify text-md font-raleway py-4'
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.p
              dangerouslySetInnerHTML={{ __html: book?.content }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
            ></motion.p>
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default BookPage;
