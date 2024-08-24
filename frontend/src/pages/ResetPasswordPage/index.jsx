import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { LoaderPinwheel, Lock } from "lucide-react";

import { useAuthStore } from "../../store/authStore";

import PasswordMeter from "../../components/PasswordMeter";
import Input from "../../components/Input";
import toast from "react-hot-toast";

const ResetPasswordPage = () => {
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');

    const { resetPassword, error, isLoading, message } = useAuthStore();

    const { token } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if( password !== confirmPassword ) {
            toast("Las contraseñas no coinciden");
            return;
        }
        try {
            await resetPassword(token, password);
            toast.success("Nueva contraseña actualizada con éxito, redirigiendo a página de inicio de sesión...");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
            toast.error(error.message || "Error al crear nueva contraseña");
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md w-full bg-[#010101] bg-opacity-90 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden"
        >
            <div className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-500 to-blue-500 text-transparent bg-clip-text">
                    Crea una nueva contraseña
                </h2>

                <form onSubmit={handleSubmit}>
                    <Input
                        icon={Lock}
                        type="password"
                        placeholder="Nueva contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                        icon={Lock}
                        type="password"
                        placeholder="Confirmar contraseña"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    {error && (
                        <p className="text-white bg-red-400 p-1 rounded-xl font-semibold text-sm text-center">
                            {error}
                        </p>
                    )}
                    {message && (
                        <p className="text-white bg-violet-400 p-1 rounded-xl font-semibold text-sm text-center">
                            {message}
                        </p>
                    )}

                    <PasswordMeter password={password} />

                    <motion.button
                        className="mt-5 w-full py-3 px-4 bg-blue-500 text-white font-bold rounded-lg shadow-lg border border-black hover:bg-black hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:ring-offset-slate-100 transition duration-200"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <LoaderPinwheel className="w-6 h-6 animate-spin mx-auto" />
                        ) : (
                            "Actualizar Contraseña"
                        )}
                    </motion.button>
                </form>
            </div>
        </motion.div>
    );
}

export default ResetPasswordPage;
