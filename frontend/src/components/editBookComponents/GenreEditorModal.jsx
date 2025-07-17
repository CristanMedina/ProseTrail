// src/components/editBookComponents/GenreEditorModal.jsx

import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Modal from "../Modal";
import { useWriteStore } from "../../store/writeStore";

const GenreEditorModal = ({ book, isOpen, onClose }) => {
  const [input, setInput] = useState(book.genres?.join(', ') || '');
  const { updateBook } = useWriteStore();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    const genres = input
      .split(',')
      .map(g => g.trim())
      .filter(Boolean);

    if (genres.length === 0) {
      toast.error("Agrega al menos un género");
      return;
    }

    setIsSaving(true);
    try {
      await updateBook(book._id, { genres });
      toast.success("Géneros actualizados");
      onClose();
    } catch (error) {
      console.error("Error al guardar géneros:", error);
      toast.error("Hubo un error al guardar los géneros");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4">
        <h2 className="text-lg font-bold">Editar Géneros</h2>
        <p className="text-sm text-gray-600">Escribe los géneros separados por comas (ej. Fantasía, Romance, Ciencia Ficción)</p>

        <textarea
          rows={3}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
          placeholder="Ejemplo: Fantasía, Misterio, Romance"
        />

        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            onClick={onClose}
          >
            Cancelar
          </button>
          <motion.button
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 font-semibold"
            onClick={handleSave}
            disabled={isSaving}
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.03 }}
          >
            {isSaving ? "Guardando..." : "Guardar"}
          </motion.button>
        </div>
      </div>
    </Modal>
  );
};

export default GenreEditorModal;
