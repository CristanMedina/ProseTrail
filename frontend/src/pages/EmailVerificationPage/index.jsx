import { useRef, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"
import { LoaderPinwheel } from 'lucide-react'
import toast from "react-hot-toast";

import { useAuthStore } from "../../store/authStore";

const EmailVerificationPage = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const { verifyEmail, error, isLoading } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join('');
    try {
      await verifyEmail(verificationCode);
      navigate("/");
      toast.success("Correo verificado con exito")
    } catch (error) {
      toast.error(error.response.data.message || "Error durante la verificación");
      console.log(error);
    }
  }

  const handleChange = (index, value) => {
    const newCode = [...code];

    if(value.length > 1)
    {
      const pastedCode = value.slice(0, 6).split('');
      for( let i = 0; i < 6; i++ ) {
        newCode[i] = pastedCode[i] || '';
      }
      setCode(newCode);

      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== '');
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();

    } else {
      newCode[index] = value;
      setCode(newCode);

      if( value && index < 5 )
      {
        inputRefs.current[index + 1].focus();
      }
    }
  };
  const handleKeyDown = (index, e) => {
    if ( e.key === "Backspace" && !code[index] && index > 0 ) {
      inputRefs.current[index - 1].focus();
    }
  };

  useEffect(() => {
    if( code.every(digit => digit !== '') )
      {
        handleSubmit(new Event('submit'));
      }
  }, [code])

  return (
    <div>
      <motion.div
      initial={{opacity: 0, y:-50}}
      animate={{opacity: 1, y:0}}
      transition={{duration: 0.5}}
      className="max-w-md w-full bg-slate-300 bg-opacity-20 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-sky-400 to-sky-500 text-transparent bg-clip-text">
          Verifica tu Correo
        </h2>

        <p className="text-center text-gray-500 mb-6"> Ingresa el codigo de 6 digitos que enviamos al correo proporcionado </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between">
            {code.map((digit, index) => (
              <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength="6"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-2xl font-bold text-black bg-gray-300 rounded-lg border border-gray-400 focus:border-sky-500"
            />
          ))}
          </div>
          { error && <p className="text-white bg-red-400 p-1 rounded-xl font-semibold text-sm text-center">{error}</p> }
          <motion.button
          className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-sky-400 to-sky-500 text-white font-bold rounded-lg shadow-lg hover:from-sky-500 hover:to-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-1 focus:ring-offset-slate-100 transition duration-200"
          whileHover={{scale:1.02}}
          whileTap={{scale:0.98}}
          type='submit'
          disabled={isLoading}
          >
            {isLoading ? <LoaderPinwheel className='w-6 h-6 animate-spin mx-auto' /> : "Verificar" }
          </motion.button>
        </form>
        
      </div>
      </motion.div>
    </div>
  )
}

export default EmailVerificationPage