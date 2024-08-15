import { useState } from 'react'
import { motion } from 'framer-motion';
import { Mail, Lock, LoaderPinwheel } from 'lucide-react'
import { Link } from 'react-router-dom';

import Input from "../components/Input";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
  }

  return (
    <motion.div
    initial={{opacity: 0, y:20}}
    animate={{opacity: 1, y:0}}
    transition={{duration: 0.5}}
    className="max-w-md w-full bg-slate-300 bg-opacity-20 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
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

          <motion.button className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-sky-400 to-sky-500 text-white font-bold rounded-lg shadow-lg hover:from-sky-500 hover:to-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-600 transition duration-200"
          whileHover={{scale:1.02}}
          whileTap={{scale:0.98}}
          >
            Ingresar
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