import { motion } from 'framer-motion'
import { useAuthStore } from '../../store/authStore';
import { formatDate } from '../../utils/date';

const ProfilePage = () => {

  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <motion.div
      initial={{opacity: 0, scale:0.9}}
      animate={{opacity: 1, scale:1}}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{duration: 0.5}}
      className="max-w-md w-full mx-auto mt-10 p-8 bg-slate-300 bg-opacity-20 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden"
      >
        <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-sky-400 to-sky-500 text-transparent bg-clip-text'>
        {user.name}
        </h2>

        <div className='space-y-6'>
          <motion.div
            className='p-5 bg-opacity-50 bg-slate-100 rounded-lg border border-slate-500 border-opacity-20'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3}}
          >
            <h3 className='text-xl font-semibold text-sky-400 mb-3'>Información de usuario</h3>
            <p className='text-black mb-5'> <span className='font-semibold'>Correo: </span> {user.email} </p>
            <h3 className='text-sm font-semibold text-sky-400'>Actividad</h3>
            <p className='text-black text-xs'> <span className='font-bold'>Se unio: </span> 
              {new Date(user.createdAt).toLocaleDateString("es-MX", {
                year: "numeric",
                month: "long",
                day: "numeric",
                })
              }
            </p>
            <p className='text-black text-xs'> <span className='font-bold'>Ultima vez activo: </span> {user.lastLogin ? formatDate(user.lastLogin) : 
                "Acaba de crear su cuenta"
              } </p>
          </motion.div>
        </div>

        <motion.div
            className='mt-4'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3}}
          >
            <motion.button
          className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-sky-400 to-sky-500 text-white font-bold rounded-lg shadow-lg hover:from-sky-500 hover:to-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-1 focus:ring-offset-slate-100 transition duration-200"
          whileHover={{scale:1.02}}
          whileTap={{scale:0.98}}
          onClick={handleLogout}
          >
            Cerrar Sesión
          </motion.button>
          </motion.div>

      </motion.div>
    </>
  )
}

export default ProfilePage