import React, { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useWriteStore } from '../../store/writeStore';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import LikeButton from '../../components/LikeButton';
import Comments from '../../components/Comments';

const BookPage = () => {
  const { bookId } = useParams();
  const { book, isLoading, getBookById } = useWriteStore();

  useEffect(() => {
    if (!book || book._id !== bookId) {
      getBookById(bookId).catch(error =>
        console.error('Error loading book:', error.response?.data?.message || error.message)
      );
    }
  }, [bookId, book?._id, getBookById]);

  useDocumentTitle(useMemo(() => `leyendo | ${book?.title || ''}`, [book?.title]));

  if (isLoading && !book) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Libro no encontrado.</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col min-h-screen w-full sm:w-11/12 md:w-3/4 lg:w-1/2 mx-auto px-4 sm:px-6 md:px-10 py-6 m-4 bg-indigo-100 bg-opacity-30 backdrop-blur-2xl backdrop-opacity-80 rounded-3xl shadow-2xl'>
      <motion.h1
        className='font-cinzel font-bold text-2xl sm:text-3xl md:text-4xl mb-3 text-center'
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {book.title}
      </motion.h1>

      <motion.div
        className='flex justify-between items-center'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className='font-raleway font-semibold text-base sm:text-lg text-indigo-600'>
          <span className='text-slate-800 mx-2 text-sm'>Author: </span>
          {book.author}
        </h2>

        <LikeButton />

      </motion.div>

      <motion.div
        className='p-2 sm:p-4 text-justify text-sm sm:text-base md:text-lg font-raleway py-4 font-thin'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <div dangerouslySetInnerHTML={{ __html: book.content }}></div>
      </motion.div>

      <Comments/>
    </div>
  );
};

export default React.memo(BookPage);
