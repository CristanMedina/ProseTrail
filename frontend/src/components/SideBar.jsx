import { useState, useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { HomeIcon, SquarePenIcon, LibraryBigIcon, UserIcon, XIcon, MenuIcon, LogOutIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
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

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerControls = useAnimationControls();
  const { logout, user } = useAuthStore();

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Current user:", user);
  }, [user]);

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    if (isOpen) {
      containerControls.start("open");
    } else {
      containerControls.start("close");
    }
  }, [isOpen, containerControls]);

  const handleOpenClose = () => {
    setIsOpen(!isOpen);
  };

  const handleProfileNav = () => {
    console.log("Navigating to profile. User:", user);
    if (user && user._id) {
      navigate(`/perfil/${user._id}`);
    } else {
      console.error("User ID is not available");
      navigate('/login');
    }
  }
  const handleWritingNav = () => {
    console.log("Navigating to writing. User:", user);
    if (user && user._id) {
      navigate(`/mis-libros/${user._id}`);
    } else {
      console.error("User ID is not available");
      navigate('/login');
    }
  }

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
            {isOpen ? <XIcon size={36} /> : <MenuIcon size={36} />}
          </motion.div>
          </button>
          {!isOpen && (
            <Link to={`/`} className="font-cinzel font-bold text-2xl -rotate-90 whitespace-nowrap absolute left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2 text-white">
              Prose Trail
            </Link>
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
              <NavItem icon={<HomeIcon size={20} />} text="Inicio" to={'/'}/>
              <NavItem icon={<LibraryBigIcon size={20} />} text="Biblioteca" to="/biblioteca" />
              <NavItem icon={<SquarePenIcon size={20} />} text="Escritura" onClick={handleWritingNav} />
            </div>

            <div className="flex flex-col gap-4 mb-4">
              <NavItem icon={<UserIcon size={20} />} text="Perfil" onClick={handleProfileNav} />
              <NavItem icon={<LogOutIcon size={20} />} text="Salir" onClick={handleLogout} />
            </div>
          </motion.nav>
        )}
      </motion.nav>
    </div>
  );
};

const NavItem = ({ icon, text, onClick, to }) => (
  <motion.div
    variants={itemVariants}
    className="flex items-center gap-3 rounded-xl p-3 bg-transparent text-white hover:bg-white hover:text-purple-700 transition duration-200 cursor-pointer"
    onClick={onClick}
  >
    {icon}
    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {onClick ? <button>{text}</button> : <Link to={to}>{text}</Link>}
    </motion.span>
  </motion.div>
);

export default SideBar;
