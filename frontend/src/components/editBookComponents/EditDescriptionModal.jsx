import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Modal from "../Modal";
import { useWriteStore } from "../../store/writeStore";

const EditDescriptionModal = ({ book, isOpen, onClose }) => {
  const [input, setInput] = useState(book.description || '');
  const { updateBook } = useWriteStore();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (input === (book.description || '')) {
      toast.error("No has realizado ningún cambio.");
      return;
    }

    setIsSaving(true);
    try {
      await updateBook(book._id, { description: input });
      toast.success("Descripción actualizada");
      onClose();
    } catch (error) {
      console.error("Error al guardar descripción:", error);
      toast.error("Hubo un error al guardar la descripción");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4">
        <h2 className="text-lg font-bold">Editar Descripción</h2>
        <p className="text-sm text-gray-600">Escribe la sinopsis de tu libro. Esto ayudará a los lectores a saber de qué trata tu historia.</p>

        <textarea
          rows={6}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
          placeholder="Escribe aquí una breve sinopsis..."
        />

        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            onClick={onClose}
            disabled={isSaving}
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

export default EditDescriptionModal;
