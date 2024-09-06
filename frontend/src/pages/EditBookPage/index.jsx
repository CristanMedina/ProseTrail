import { useParams } from 'react-router-dom';
import { EditorContent } from '@tiptap/react';
import MenuBar from '../../components/editBookComponents/MenuBar';
import TitleInput from '../../components/editBookComponents/TitleInput';
import StatusMessage from '../../components/editBookComponents/StatusMessage';
import useBookEditor from '../../components/editBookComponents/useBookEditor';

const EditBookPage = () => {
  const { id } = useParams();
  const { title, editor, statusMessage, handleTitleChange } = useBookEditor(id);

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
