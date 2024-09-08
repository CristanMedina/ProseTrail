import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useWriteStore } from '../../store/writeStore';

const BookPage = () => {
    const { bookId } = useParams();
    const { book, getBookById, isLoading } = useWriteStore();

    useEffect(() => {
        const loadBook = async () => {
            try {
                const book = await getBookById(bookId);
            } catch (error) {
                console.error('Error al cargar libro:', error.response?.data?.message || error.message);
            }
        }
        if (!isLoading) {
            loadBook();
          }
    }, [book, getBookById, isLoading])
  return (
    <div className='flex flex-col min-h-screen w-1/2 mx-auto p-10 m-4 bg-indigo-100 bg-opacity-30 backdrop-blur-2xl backdrop-opacity-80 rounded-3xl shadow-2xl'>
        <h1 className='font-cinzel font-bold text-4xl mb-3 text-center'>{book?.title}</h1>
        <div className='flex justify-between'>
            <h2 className='font-raleway font-semibold text-lg text-indigo-600'>
                <span className='text-slate-800 mx-2 text-sm'>Author: </span>
                {book?.author}
            </h2>
            <div className='text-sm font-sourceCodePro'>
                <p>Publicado: {book?.publishedDate}</p>
            </div>
        </div>
        <div className='p-4 text-justify text-md font-raleway py-4'>
            <p dangerouslySetInnerHTML={{__html:book?.content}}></p>
        </div>
    </div>
  )
}

export default BookPage
