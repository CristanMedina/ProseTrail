import { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import { BoldIcon, ItalicIcon, AlignLeftIcon, AlignRightIcon, AlignCenterIcon, AlignJustifyIcon, TrashIcon  } from 'lucide-react'

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null
  }

  return (
    <div className="menuBar">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'is-active' : ''}
          >
            <BoldIcon/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is-active' : ''}
          >
            <ItalicIcon/>
          </button>
          <button
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
          >
            <AlignLeftIcon/>
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
          >
            <AlignCenterIcon/>
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
          >
            <AlignRightIcon/>
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}
          >
            <AlignJustifyIcon/>
          </button>
          <button onClick={() => [editor.chain().focus().unsetAllMarks().run(), editor.chain().focus().clearNodes().run()]}>
            <TrashIcon/>
          </button>
    </div>
  )
}

const EditBookPage = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: '<p>Comienza a escribir tu historia...</p>',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      console.log(html)
    },
  })

  useEffect(() => {
    if (editor) {
      editor.commands.focus('end')
    }
  }, [editor])

  return (
    <div className="editorWrapper">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

export default EditBookPage