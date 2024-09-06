import { BoldIcon, ItalicIcon, AlignLeftIcon, AlignRightIcon, AlignCenterIcon, AlignJustifyIcon, TrashIcon, IndentIncreaseIcon } from 'lucide-react';
import MenuBarButton from './MenuBarButton';

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const buttons = [
    { onClick: () => editor.chain().focus().toggleBold().run(), isActive: editor.isActive('bold'), icon: BoldIcon },
    { onClick: () => editor.chain().focus().toggleItalic().run(), isActive: editor.isActive('italic'), icon: ItalicIcon },
    { onClick: () => editor.chain().focus().setTextAlign('left').run(), isActive: editor.isActive({ textAlign: 'left' }), icon: AlignLeftIcon },
    { onClick: () => editor.chain().focus().setTextAlign('center').run(), isActive: editor.isActive({ textAlign: 'center' }), icon: AlignCenterIcon },
    { onClick: () => editor.chain().focus().setTextAlign('right').run(), isActive: editor.isActive({ textAlign: 'right' }), icon: AlignRightIcon },
    { onClick: () => editor.chain().focus().setTextAlign('justify').run(), isActive: editor.isActive({ textAlign: 'justify' }), icon: AlignJustifyIcon },
    { onClick: () => editor.chain().focus().toggleBlockquote().run(), isActive: editor.isActive('blockquote'), icon: IndentIncreaseIcon },
    { onClick: () => [editor.chain().focus().unsetAllMarks().run(), editor.chain().focus().clearNodes().run()], icon: TrashIcon }
  ];

  return (
    <div className="menuBar">
      {buttons.map((button, index) => (
        <MenuBarButton key={index} {...button} />
      ))}
    </div>
  );
};

export default MenuBar;