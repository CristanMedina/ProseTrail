import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { EditorContent } from '@tiptap/react';
import { toast } from 'react-hot-toast';

import MenuBar from '../../components/editBookComponents/MenuBar';
import TitleInput from '../../components/editBookComponents/TitleInput';
import StatusMessage from '../../components/editBookComponents/StatusMessage';
import useBookEditor from '../../components/editBookComponents/useBookEditor';
import DeleteBookButton from '../../components/editBookComponents/DeleteBookButton';
import TogglePublishButton from '../../components/editBookComponents/TogglePublishButton';
import GenreEditorModal from '../../components/editBookComponents/GenreEditorModal';
import CoverUploadModal from '../../components/editBookComponents/CoverUploadModal';
import EditDescriptionModal from '../../components/editBookComponents/EditDescriptionModal';

import { useWriteStore } from '../../store/writeStore';

const EditBookPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const { getBookById } = useWriteStore();

  const [book, setBook] = useState(null);
  const [isGenreModalOpen, setIsGenreModalOpen] = useState(false);
  const [isCoverModalOpen, setIsCoverModalOpen] = useState(false);
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);

  const { title, editor, statusMessage, handleTitleChange } = useBookEditor(id);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const fetchedBook = await getBookById(id, { asAuthor: true });
        setBook(fetchedBook);
      } catch (error) {
        console.error("Error fetching book:", error);
        toast.error("No se pudo obtener el libro.");
      }
    };

    fetchBook();
    document.title = `editando | ${title}`;

    return () => {
      document.title = 'Prose Trail';
    };
  }, [id, title, location, getBookById]);

  const refreshBook = async () => {
    const updated = await getBookById(id, { asAuthor: true });
    setBook(updated);
  };

  return (
    <div className="editorWrapper">
      <div className="flex flex-col space-y-4">

        {book && (
          <p className="text-sm text-gray-500 text-right">
            Visualizaciones: <span className="font-semibold">{book.views || 0}</span>
          </p>
        )}

        <div className='flex items-center justify-between mt-6'>
          {book && <DeleteBookButton book={book} />}
          {book && <TogglePublishButton book={book} onStatusChange={setBook} />}
          <StatusMessage message={statusMessage} />
        </div>

        <TitleInput title={title} onChange={handleTitleChange} />

        {book?.genres?.length > 0 && (
          <div className="text-sm text-gray-700 mb-2">
            <strong>Géneros:</strong> {book.genres.join(', ')}
          </div>
        )}

        {book && (
          <div className="flex gap-2">
            <button
              onClick={() => setIsGenreModalOpen(true)}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition duration-200 font-semibold w-fit"
            >
              Editar Géneros
            </button>

            <button
              onClick={() => setIsCoverModalOpen(true)}
              className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition duration-200 font-semibold w-fit"
            >
              Cambiar Portada
            </button>

            <button
                onClick={() => setIsDescriptionModalOpen(true) }
                className="px-4 py-2 bg-slate-500 text-white rounded hover:bg-slate-600 transition duration-200 font-semibold w-fit"
            >
                Editar Descripción
            </button>
          </div>
        )}

        <MenuBar editor={editor} />
        <EditorContent editor={editor} />

        {book && (
          <>
            <GenreEditorModal
              book={book}
              isOpen={isGenreModalOpen}
              onClose={() => {
                setIsGenreModalOpen(false);
                refreshBook();
              }}
            />

            <CoverUploadModal
              bookId={book._id}
              isOpen={isCoverModalOpen}
              onClose={() => setIsCoverModalOpen(false)}
              onUploaded={refreshBook}
            />

            <EditDescriptionModal
                book={book}
                isOpen={isDescriptionModalOpen}
                onClose={() => {
                  setIsDescriptionModalOpen(false);
                  refreshBook();
                }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default EditBookPage;
