import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';

const Hero = () => {
    const { user } = useAuthStore();
    const navigate = useNavigate();

    const handleEscribirNav = () => {
        console.log("Redirigiendo a cuentos de usuario: ", user);
        if (user && user._id) {
        navigate(`/mis-libros/${user._id}`);
        } else {
        navigate('/login');
        }
    }
    const handleBibliotecaNav = () => {
        console.log("Redirigiendo a biblioteca");
        navigate('/biblioteca');
    }

    return(
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
        >
            <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="text-6xl font-bold text-gray-800 my-8 leading-tight font-oswald"
            >
            <span className="text-blue-600">Escribe</span>, Publica, <span className="text-blue-600">Conecta</span>
            </motion.h1>
            <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="text-2xl text-gray-700 mb-8 font-sourceCodePro"
            >
            <p className="text-2xl text-gray-800">
                Prose Trail es tu plataforma para<br />
                crear, compartir y guardar tus relatos.
            </p>
            </motion.p>
            <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
            >
            <motion.button
            className="py-3 px-6 font-bold rounded-full text-lg mr-4 bg-blue-600 text-white hover:bg-blue-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleEscribirNav}
        >
            COMENZAR A ESCRIBIR
        </motion.button>
        <motion.button
            className="py-3 px-6 font-bold rounded-full text-lg mr-4 bg-transparent text-blue-600 border-2 border-blue-600 hover:bg-blue-100"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleBibliotecaNav}
        >
            BIBLIOTECA
        </motion.button>
            </motion.div>
        </motion.section>
        )
}

export default Hero;
