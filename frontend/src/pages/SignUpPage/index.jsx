import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, User, Lock, LoaderPinwheel } from "lucide-react"

import Input from "../../components/Input";
import PasswordMeter from "../../components/PasswordMeter";
import { useAuthStore } from "../../store/authStore";


const SignUpPage = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const {signup, error, isLoading} = useAuthStore();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      await signup(email, password, name);
      navigate("/verify-email");
    } catch (error) {
      console.error("Error de Registro: ", error);
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
          Crea una cuenta
        </h2>

        <form onSubmit={handleSignUp}>
          <Input
          icon={User}
          type='text'
          placeholder='Alias/Usuario'
          value={name}
          onChange={(e) => setName(e.target.value)}
          />
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
          { error && <p className="text-white bg-red-400 p-1 rounded-xl font-semibold text-sm text-center">{error}</p> }

          <PasswordMeter password={password}/>

          <motion.button 
          className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-sky-400 to-sky-500 text-white font-bold rounded-lg shadow-lg hover:from-sky-500 hover:to-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-1 focus:ring-offset-slate-100 transition duration-100"
          whileHover={{scale:1.02}}
          whileTap={{scale:0.9}}
          type="submit"
          disabled={isLoading}
          >
            {isLoading ? <LoaderPinwheel className='w-6 h-6 animate-spin mx-auto' /> : "Registrarme" }
          </motion.button>
        </form>
      </div>
      <div className="px-8 py-4 bg-slate-500 bg-opacity-50 flex justify-center">
        <p className="text-sm text-gray-200">
          ¿Ya estas registrado? {" "}
          <Link to={"/login"} className="text-sky-600 hover:underline ml-1">
          Ingresar con mi cuenta
          </Link>
        </p>
      </div>
    </motion.div>
  )
}

export default SignUpPage