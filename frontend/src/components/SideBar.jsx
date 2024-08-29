import { useState, useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { Edit, Book, User, X, Menu, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from '../store/authStore';


const containerVariants = {
  close: {
    width: "5rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
  open: {
    width: "14rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },
};

const TopNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerControls = useAnimationControls();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    if (isOpen) {
      containerControls.start("open");
    } else {
      containerControls.start("close");
    }
  }, [isOpen]);

  const handleOpenClose = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <motion.nav
        variants={containerVariants}
        animate={containerControls}
        initial="close"
        className="bg-gray-400 bg-opacity-50 backdrop-filter backdrop-blur-xs flex flex-col z-10 p-5 absolute top-0 left-0 h-full"
      >
        <div className="flex justify-between items-center">
          <button onClick={handleOpenClose} className="w-10 h-10">
            {isOpen ? <X size={36} /> : <Menu size={36} />}
          </button>
          {!isOpen && (
            <p className="font-cinzel font-bold text-2xl -rotate-90 whitespace-nowrap absolute left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2">
              Prose Trail
            </p>
          )}
        </div>

        {isOpen && (
          <motion.nav
            className="flex flex-col justify-between flex-1 gap-6 mt-8 text-black font-sourceCodePro font-semibold"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            <div className="flex flex-col gap-6">
              <motion.div variants={itemVariants} className="flex items-center gap-3 rounded-xl p-3 bg-transparent text-black hover:bg-blue-500 hover:text-white transition duration-200">
                <Book size={20} />
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Link>
                    Biblioteca
                  </Link>
                </motion.span>
              </motion.div>
              <motion.div variants={itemVariants} className="flex items-center gap-3 rounded-xl p-3 bg-transparent text-black hover:bg-blue-500 hover:text-white transition duration-200">
                <Edit size={20} />
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Link>
                    Escritura
                  </Link>
                </motion.span>
              </motion.div>
              <motion.div variants={itemVariants} className="flex items-center gap-3 rounded-xl p-3 bg-transparent text-black hover:bg-blue-500 hover:text-white transition duration-200">
                <Book size={20} />
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Link>
                    Mis Historias
                  </Link>
                </motion.span>
              </motion.div>
            </div>

            <div className="flex flex-col gap-6">
              <motion.div variants={itemVariants} className="flex items-center gap-3 rounded-xl p-3 bg-transparent text-black hover:bg-blue-500 hover:text-white transition duration-200">
                <User size={20} />
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Link>
                    Perfil
                  </Link>
                </motion.span>
              </motion.div>
              <motion.div variants={itemVariants} className="flex items-center gap-3 rounded-xl p-3 bg-transparent text-black hover:bg-blue-500 hover:text-white transition duration-200">
                <LogOut size={20} />
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <button onClick={handleLogout}>
                    Salir
                  </button>
                </motion.span>
              </motion.div>
            </div>
          </motion.nav>
        )}
      </motion.nav>
    </div>
  );
};

export default TopNavbar;
