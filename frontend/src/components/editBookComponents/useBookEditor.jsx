import { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import { debounce } from 'lodash';
import { useWriteStore } from '../../store/writeStore';

const useBookEditor = (id) => {
  const { getBookById, updateBook, isLoading } = useWriteStore();
  const [book, setBook] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [statusMessage, setStatusMessage] = useState('Up to date');
  const [isLoaded, setIsLoaded] = useState(false);

  const editorRef = useRef(null);

  useEffect(() => {
    const loadBook = async () => {
      try {
        const loadedBook = await getBookById(id);
        setBook(loadedBook);
        setTitle(loadedBook.title);
        setContent(loadedBook.content);
        setIsLoaded(true);
      } catch (error) {
        console.error('Error al cargar datos de libro:', error.response?.data?.message || error.message);
      }
    };

    if (!isLoaded) {
      loadBook();
    }
  }, [id, getBookById, isLoaded]);

  const debouncedUpdate = useMemo(
    () => debounce((newTitle, newContent) => {
      updateBook(id, { title: newTitle, content: newContent });
      setBook(prevBook => ({ ...prevBook, title: newTitle, content: newContent }));
    }, 1000),
    [id, updateBook]
  );

  const handleContentUpdate = useCallback(({ editor }) => {
    if (editorRef.current !== editor) {
      editorRef.current = editor;
    }
    const newContent = editor.getHTML();
    setStatusMessage('Guardando cambios...');
    debouncedUpdate(title, newContent);
  }, [debouncedUpdate, title]);

  const handleTitleChange = useCallback((e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setStatusMessage('Guardando cambios...');
    debouncedUpdate(newTitle, content);
  }, [content, debouncedUpdate]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content,
    onUpdate: handleContentUpdate,
  });

  useEffect(() => {
    if (editor && content && !editor.isDestroyed) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  useEffect(() => {
    setStatusMessage(isLoading ? 'Guardando cambios...' : 'Guardado');
  }, [isLoading]);

  return {
    book,
    title,
    editor,
    statusMessage,
    handleTitleChange,
  };
};

export default useBookEditor;
