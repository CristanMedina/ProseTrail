import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/write";

axios.defaults.withCredentials = true;

export const useWriteStore = create((set) => ({
    book: null,
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    message: null,

    createBook: async ( title ) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/create-book`, { title });
            set({
                book: response.data.book,
                isLoading: false,
                message: response.data.message
            })
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error al crear libro",
                isLoading: false
            });
            throw error;
        }
    }
}))