import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { EditorContent } from '@tiptap/react';
import MenuBar from '../../components/editBookComponents/MenuBar';
import TitleInput from '../../components/editBookComponents/TitleInput';
import StatusMessage from '../../components/editBookComponents/StatusMessage';
import useBookEditor from '../../components/editBookComponents/useBookEditor';
import DeleteBookButton from '../../components/editBookComponents/DeleteBookButton';
import { useWriteStore } from '../../store/writeStore';

const EditBookPage = () => {
  const { id } = useParams();
  const { getBookById } = useWriteStore();
  const [book, setBook] = useState(null);
  const { title, editor, statusMessage, handleTitleChange } = useBookEditor(id);
  const location = useLocation();

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
