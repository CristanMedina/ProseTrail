import { create } from "zustand";
import axios from "axios";

const API_URL = "/api/write";

axios.defaults.withCredentials = true;

export const useWriteStore = create((set) => ({
    book: null,
    books: [],
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    isAuthor: false,
    message: null,

    createBook: async ( title ) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/create-book`, { title });
            set({
                book: response.data.book,
                isLoading: false,
                message: response.data.message
            });

            return response.data.book;
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error al crear libro",
                isLoading: false
            });
            throw error;
        }
    },

    getUserBooks: async (userId) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/user/${userId}/books`);
            set({
                books: response.data.books || [],
                isLoading: false,
            });
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error al obtener libros",
                isLoading: false,
                books: [],
            });
            throw error;
        }
    },

    getBookById: async (id, options = {}) => {
    set({ isLoading: true, error: null });

    const params = new URLSearchParams(options).toString();
    const url = `${API_URL}/book/${id}${params ? `?${params}` : ''}`;

    try {
        const response = await axios.get(url);
        const book = response.data.book;
        set({
        book,
        isLoading: false,
        });
        return book;
    } catch (error) {
        set({
        error: error.response?.data?.message || "Error retrieving book",
        isLoading: false,
        });
        throw error;
    }
    },

    updateBook: async (id, updates) => {
        set({ isLoading: true, error: null });

        try {
            const response = await axios.patch(`${API_URL}/update-book/${id}`, updates);

            if (response.status === 200) {
                set({
                    book: response.data.book,
                    isLoading: false,
                    message: "Book updated successfully",
                });
                console.log("Book updated successfully:", response.data.book);
                return response.data.book; // 🔁 DEVUELVE el libro actualizado
            } else {
                console.warn("Unexpected response status:", response.status);
                set({ isLoading: false });
            }
        } catch (error) {
            set({ isLoading: false });

            if (error.code === 'ERR_NETWORK') {
                console.error("Network error, please check your connection.");
                alert("Failed to update the book. Please check your internet connection and try again.");
            } else if (error.response) {
                console.error("Server error:", error.response.data.message || error.message);
                set({
                    error: error.response.data.message || "Error updating book",
                });
            } else if (error.request) {
                console.error("No response received from server:", error.request);
                set({
                    error: "No response from server. Please try again later.",
                });
            } else {
                console.error("Error updating book:", error.message || error);
                set({
                    error: "An unexpected error occurred while updating the book.",
                });
            }

            throw error;
        }
    },

    getAllBooks: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/all-books`);
            set({
                books: response.data.books || [],
                isLoading: false,
                message: response.data.message
            });
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error al cargar libros",
                isLoading: false,
                books: [],
            });
            throw error;
        }
    },

    deleteBook: async (bookId) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.delete(`${API_URL}/delete-book/${bookId}`);
            set({
                isLoading: false,
                error: null,
                message: response.data.message
            });
            return response.data;
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error al eliminar libro",
                isLoading: false,
            });
            throw error;
        }
    },

    publishBook: async (bookId) => {
        set({isLoading: true, error: null});
        try{
            const response = await axios.patch(`${API_URL}/publish-book/${bookId}`);
            set({
                book: response.data.book,
                isLoading: false,
                message: response.data.book,
            });
            return response.data.book;
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error al publicar libro",
                isLoading: false,
            });
            throw error;
        }
    },

    toggleLikeBook: async (bookId) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.patch(`${API_URL}/like-book/${bookId}`);
      set({
        book: response.data.book,
        isLoading: false,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error al procesar el like";
      set({
        isLoading: false,
        error: errorMessage,
      });
      throw new Error(errorMessage);
    }
  },

  addComment: async (bookId, text) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.patch(`${API_URL}/comment-book/${bookId}`, { text });
      set({
        book: response.data.book,
        isLoading: false,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error al añadir comentario";
      set({
        isLoading: false,
        error: errorMessage,
      });
      throw new Error(errorMessage);
    }
  },

}))
