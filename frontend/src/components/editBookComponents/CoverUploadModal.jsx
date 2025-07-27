import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

const CoverUploadModal = ({ bookId, isOpen, onClose, onUploaded }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return toast.error("Selecciona una imagen primero.");

    const formData = new FormData();
    formData.append("cover", file);

    try {
      setUploading(true);
      const response = await axios.patch(
        `http://localhost:5000/api/write/upload-cover/${bookId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      toast.success("Portada actualizada.");
      // Ensures we receive and use the updated image path
      onUploaded({ ...response.data.book, coverImage: response.data.coverImage });
      onClose();
    } catch (err) {
      toast.error("Error al subir la imagen.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-md w-[90%] max-w-md space-y-4">
        <h2 className="text-lg font-semibold">Subir nueva portada</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm"
        />
        <div className="flex justify-end gap-2 mt-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? "Subiendo..." : "Subir"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoverUploadModal;
