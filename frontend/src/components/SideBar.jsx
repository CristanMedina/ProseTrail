import { useState, useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { Edit, Book, User, X, Menu, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from '../store/authStore';

const containerVariants = {
  close: {
    width: "4rem",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      duration: 0.3,
    },
  },
  open: {
    width: "16rem",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      duration: 0.3,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
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
        className="bg-gradient-to-b from-purple-600 to-indigo-700 flex flex-col z-10 p-3 fixed top-0 left-0 h-full shadow-lg"
      >
        <div className="flex justify-between items-center mb-8">
          <button onClick={handleOpenClose} className="w-10 h-10 text-white hover:text-blue-300 transition-colors duration-200">
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? <X size={36} /> : <Menu size={36} />}
          </motion.div>
          </button>
          {!isOpen && (
            <p className="font-cinzel font-bold text-2xl -rotate-90 whitespace-nowrap absolute left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2 text-white">
              Prose Trail
            </p>
          )}
        </div>

        {isOpen && (
          <motion.nav
            className="flex flex-col justify-between flex-1 gap-8 text-white font-sourceCodePro font-medium"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.05,
                },
              },
            }}
          >
            <div className="flex flex-col gap-4">
              <NavItem icon={<Book size={20} />} text="Biblioteca" />
              <NavItem icon={<Edit size={20} />} text="Escritura" />
              <NavItem icon={<Book size={20} />} text="Mis Historias" />
            </div>

            <div className="flex flex-col gap-4 mb-4">
              <NavItem icon={<User size={20} />} text="Perfil" />
              <NavItem icon={<LogOut size={20} />} text="Salir" onClick={handleLogout} />
            </div>
          </motion.nav>
        )}
      </motion.nav>
    </div>
  );
};

const NavItem = ({ icon, text, onClick }) => (
  <motion.div
    variants={itemVariants}
    className="flex items-center gap-3 rounded-xl p-3 bg-transparent text-white hover:bg-white hover:text-purple-700 transition duration-200 cursor-pointer"
    onClick={onClick}
  >
    {icon}
    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {onClick ? <button>{text}</button> : <Link>{text}</Link>}
    </motion.span>
  </motion.div>
);

export default TopNavbar;
