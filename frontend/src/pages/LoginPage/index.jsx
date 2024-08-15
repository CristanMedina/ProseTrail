import { useState } from 'react'
import { motion } from 'framer-motion';
import { Mail, Lock, LoaderPinwheel } from 'lucide-react'
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useAuthStore } from '../../store/authStore';

import Input from "../../components/Input";


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      await login(email,password);
      navigate("/");
      toast.success("Cuenta ingresada con exito")
    } catch (error) {
      toast.error(error.response.data.message || "Error durante el Ingreso de cuenta");
      console.log(error);
    }
  }

  return (
    <motion.div
    initial={{opacity: 0, y:20}}
    animate={{opacity: 1, y:0}}
    transition={{duration: 0.5}}
    className="max-w-md w-full bg-slate-300 bg-opacity-20 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-sky-400 to-sky-500 text-transparent bg-clip-text">
          Iniciar Sesión
        </h2>

        <form onSubmit={handleLogin}>
          <Input
          icon={Mail}
          type='email'
          placeholder='Correo Electronico'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
          <Input
          icon={Lock}
          type='password'
          placeholder='Contraseña'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />

          <div className="mt-5 px-8 py-4flex justify-center">
              <Link to={"/forgot-password"} className="text-sm text-sky-500 hover:underline">
              ¿Olvidaste tu contraseña?
              </Link>
          </div>
          { error && <p className="text-white bg-red-400 p-1 rounded-xl font-semibold text-sm text-center">{error}</p> }

          <motion.button
          className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-sky-400 to-sky-500 text-white font-bold rounded-lg shadow-lg hover:from-sky-500 hover:to-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-1 focus:ring-offset-slate-100 transition duration-200"
          whileHover={{scale:1.02}}
          whileTap={{scale:0.98}}
          type='submit'
          disabled={isLoading}
          >
            {isLoading ? <LoaderPinwheel className='w-6 h-6 animate-spin mx-auto' /> : "Ingresar" }
          </motion.button>
        </form>
      </div>
      <div className="px-8 py-4 bg-slate-900 bg-opacity-50 flex justify-center">
        <p className="text-sm text-gray-200">
          ¿No estas Registrado? {" "}
          <Link to={"/signup"} className="text-sky-500 hover:underline">
          Crear Cuenta
          </Link>
        </p>
      </div>
    </motion.div>
  )
}

export default LoginPage