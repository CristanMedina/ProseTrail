import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { EditorContent } from '@tiptap/react';
import MenuBar from '../../components/editBookComponents/MenuBar';
import TitleInput from '../../components/editBookComponents/TitleInput';
import StatusMessage from '../../components/editBookComponents/StatusMessage';
import useBookEditor from '../../components/editBookComponents/useBookEditor';

const EditBookPage = () => {
  const { id } = useParams();
  const { title, editor, statusMessage, handleTitleChange } = useBookEditor(id);
  const location = useLocation();

  useEffect(() => {
    document.title = `editando | ${title}`;

    return () => {
      document.title = 'Prose Trail';
    };
  }, [title, location]);

  return (
    <div className="editorWrapper">
      <div className="flex flex-col space-y-4">
        <StatusMessage message={statusMessage} />
        <TitleInput title={title} onChange={handleTitleChange} />
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default EditBookPage;
