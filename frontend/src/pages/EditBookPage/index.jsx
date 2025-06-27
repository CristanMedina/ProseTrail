import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { EditorContent } from '@tiptap/react';
import { toast } from 'react-hot-toast';
import MenuBar from '../../components/editBookComponents/MenuBar';
import TitleInput from '../../components/editBookComponents/TitleInput';
import StatusMessage from '../../components/editBookComponents/StatusMessage';
import useBookEditor from '../../components/editBookComponents/useBookEditor';
import DeleteBookButton from '../../components/editBookComponents/DeleteBookButton';
import { useWriteStore } from '../../store/writeStore';

const EditBookPage = () => {
  const { id } = useParams();
  const { getBookById, publishBook } = useWriteStore();
  const [book, setBook] = useState(null);
  const { title, editor, statusMessage, handleTitleChange } = useBookEditor(id);
  const location = useLocation();

  const handlePublish = async () => {
  try {
    const published = await publishBook(book._id);
    toast.success("Libro publicado con éxito");
    setBook(published);
  } catch (error) {
    toast.error("Error al publicar el libro");
    console.error("Error publishing book:", error);
  }
};

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const fetchedBook = await getBookById(id);
        setBook(fetchedBook);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };

    fetchBook();
    document.title = `editando | ${title}`;

    return () => {
      document.title = 'Prose Trail';
    };
  }, [id, title, location, getBookById]);

  return (
    <div className="editorWrapper">
      <div className="flex flex-col space-y-4">

        <div className='flex align-middle justify-between mt-6'>
            {book && <DeleteBookButton book={book} />}
            {book &&
                (<motion.button
                    onClick={handlePublish}
                    className="mb-2 p-3 rounded-3xl font-semibold text-teal-700 bg-teal-200 hover:bg-teal-400 hover:text-teal-50 transition duration-200"
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                    Publicar
                    </motion.button>)}
            <StatusMessage message={statusMessage} />
        </div>

        <TitleInput title={title} onChange={handleTitleChange} />
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />

      </div>
    </div>
  );
};

export default EditBookPage;
