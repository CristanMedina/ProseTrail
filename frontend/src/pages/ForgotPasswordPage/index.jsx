import { motion } from 'framer-motion'
import { useState } from 'react'
import { ArrowLeftIcon, LoaderPinwheel, Mail } from 'lucide-react';

import { useAuthStore } from '../../store/authStore'
import { Link } from 'react-router-dom';
import Input from '../../components/Input';


const ForgotPasswordPage = () => {
    const [ email, setEmail ] = useState('');
    const [ isSubmitted, setIsSubmitted ] = useState(false);

    const { isLoading, forgotPassword, error } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await forgotPassword(email);
        setIsSubmitted(true);
    };

  return (
    <>
        <motion.div
            initial={{opacity: 0, y:20}}
            animate={{opacity: 1, y:0}}
            transition={{duration: 0.5}}
            className="max-w-md w-full bg-slate-300 bg-opacity-20 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden"
            >
                <div className="p-8">
                    <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-sky-400 to-sky-500 text-transparent bg-clip-text">
                    Contraseña Olvidada
                    </h2>
                    
                    { !isSubmitted ? (
                        <form onSubmit={handleSubmit}>
                        <p className='text-sky-800 mb-6 text-center'>Ingresa el correo electronico para enviar un link donde podras cambiar tu contraseña</p>
                        <Input
                        icon={Mail}
                        type='email'
                        placeholder='Correo Electronico'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
    
                        { error && <p className="text-white bg-red-400 p-1 rounded-xl font-semibold text-sm text-center">{error}</p> }
    
                        <motion.button
                        className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-sky-400 to-sky-500 text-white font-bold rounded-lg shadow-lg hover:from-sky-500 hover:to-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-1 focus:ring-offset-slate-100 transition duration-200"
                        whileHover={{scale:1.02}}
                        whileTap={{scale:0.98}}
                        type='submit'
                        disabled={isLoading}
                        >
                            {isLoading ? <LoaderPinwheel className='w-6 h-6 animate-spin mx-auto' /> : "Enviar" }
                        </motion.button>
                        </form>
                    ) : (
                        <div className='text-center'>
                            <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            className='w-16 h-16 bg-sky-500 rounded-full flex items-center justify-center mx-auto mb-4'
                            >
                                <Mail className='h-8 w-8 text-white'/>
                            </motion.div>
                            <p className='text-slate-500 mb-6'>
                                Si el correo que proporcionaste es correcto, un correo sera enviado a <span className='text-sky-500'>{email}</span> para actualizar la contraseña.
                            </p>
                        </div>
                    ) }
                    <div className='px-8 py-6 flex justify-center'>
                        <Link to={"/login"} className='text-md text-sky-500 hover:underline flex items-center'>
                            <ArrowLeftIcon size={20}/> Regresar a pagina de ingreso.
                        </Link>
                    </div>
                </div>
        </motion.div>
    </>
  )
}

export default ForgotPasswordPage