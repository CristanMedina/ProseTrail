import React, { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useWriteStore } from '../../store/writeStore';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const BookPage = () => {
  const { bookId } = useParams();
  const { book, getBookById, isLoading } = useWriteStore();

  useEffect(() => {
    if (!book && !isLoading) {
      getBookById(bookId).catch(error =>
        console.error('Error loading book:', error.response?.data?.message || error.message)
      );
    }
  }, [bookId, book, getBookById, isLoading]);

  useDocumentTitle(useMemo(() => `leyendo | ${book?.title || ''}`, [book?.title]));

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col min-h-screen w-1/2 mx-auto p-10 m-4 bg-indigo-100 bg-opacity-30 backdrop-blur-2xl backdrop-opacity-80 rounded-3xl shadow-2xl'>
      <motion.h1 className='font-cinzel font-bold text-4xl mb-3 text-center'
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      >
        {book?.title}
      </motion.h1>

      <motion.div className='flex justify-between'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className='font-raleway font-semibold text-lg text-indigo-600'>
          <span className='text-slate-800 mx-2 text-sm'>Author: </span>
          {book?.author}
        </h2>
        <div className='text-sm font-sourceCodePro'>
          <p>Publicado: {book?.publishedDate}</p>
        </div>
      </motion.div>

      <motion.div className='p-4 text-justify text-md font-raleway py-4'
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      >
        <p dangerouslySetInnerHTML={{ __html: book?.content }}></p>
      </motion.div>
    </div>
  );
};

export default React.memo(BookPage);
