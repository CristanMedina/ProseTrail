import React, { useEffect, useState, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import { BoldIcon, ItalicIcon, AlignLeftIcon, AlignRightIcon, AlignCenterIcon, AlignJustifyIcon, TrashIcon } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useWriteStore } from '../../store/writeStore';
import { debounce } from 'lodash';

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="menuBar">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        <BoldIcon />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        <ItalicIcon />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
      >
        <AlignLeftIcon />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
      >
        <AlignCenterIcon />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
      >
        <AlignRightIcon />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}
      >
        <AlignJustifyIcon />
      </button>
      <button onClick={() => [editor.chain().focus().unsetAllMarks().run(), editor.chain().focus().clearNodes().run()]}>
        <TrashIcon />
      </button>
    </div>
  );
};

const EditBookPage = () => {
  const { id } = useParams();
  console.log('Book ID:', id);

  const { getBookById, updateBook, isLoading } = useWriteStore();
  const [content, setContent] = useState('');
  const [statusMessage, setStatusMessage] = useState('Up to date');

  useEffect(() => {
    const loadBook = async () => {
      console.log('Loading book with ID:', id);
      try {
        const bookContent = await getBookById(id);
        setContent(bookContent);
      } catch (error) {
        console.error('Failed to load book:', error.response?.data || error.message);
      }
    };
    loadBook();
  }, [id, getBookById]);

  const debouncedUpdate = useCallback(
    debounce((newContent) => {
      updateBook(id, newContent);
    }, 500),
    [id, updateBook]
  );

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      const newContent = editor.getHTML();
      setStatusMessage('Saving changes...'); // Show saving message
      debouncedUpdate(newContent);
    },
  });

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  useEffect(() => {
    if (isLoading) {
      setStatusMessage('Saving changes...');
    } else {
      setStatusMessage('Up to date');
    }
  }, [isLoading]);

  return (
    <div className="editorWrapper">
      <div className='flex align-middle justify-end'>
        <div className="statusMessage">{statusMessage}</div>
      </div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default EditBookPage;
