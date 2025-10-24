import { useState, useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";
import {
  HomeIcon,
  SquarePenIcon,
  LibraryBigIcon,
  UserIcon,
  XIcon,
  MenuIcon,
  LogOutIcon,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const desktopVariants = {
  close: { width: "4rem", transition: { type: "spring", stiffness: 300, damping: 30 } },
  open: { width: "16rem", transition: { type: "spring", stiffness: 300, damping: 30 } },
};

const mobileVariants = {
  hidden: { x: "-100%" },
  visible: { x: 0, transition: { type: "spring", stiffness: 300, damping: 25 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
};

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const containerControls = useAnimationControls();
  const { logout, user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    containerControls.start(isOpen ? "open" : "close");
  }, [isOpen, containerControls]);

  const handleOpenClose = () => setIsOpen(!isOpen);
  const handleMobileToggle = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const handleLogout = () => logout();
  const handleProfileNav = () => navigate(user?._id ? `/perfil/${user._id}` : "/login");
  const handleWritingNav = () => navigate(user?._id ? `/mis-libros/${user._id}` : "/login");

  return (
    <>
      <motion.nav
        variants={desktopVariants}
        animate={containerControls}
        initial="close"
        className="hidden md:flex bg-gradient-to-b from-purple-600 to-indigo-700 flex-col z-10 p-3 fixed top-0 left-0 h-full shadow-lg"
      >
        <div className="flex justify-between items-center mb-8">
          <button onClick={handleOpenClose} className="w-10 h-10 text-white hover:text-blue-300">
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
              {isOpen ? <XIcon size={36} /> : <MenuIcon size={36} />}
            </motion.div>
          </button>
          {!isOpen && (
            <Link
              to={`/`}
              className="font-cinzel font-bold text-2xl -rotate-90 whitespace-nowrap absolute left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2 text-white"
            >
              Prose Trail
            </Link>
          )}
        </div>

        {isOpen && (
          <motion.div
            className="flex flex-col justify-between flex-1 gap-8 text-white font-sourceCodePro font-medium"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
          >
            <div className="flex flex-col gap-4">
              <NavItem icon={<HomeIcon size={20} />} text="Inicio" to={"/"} />
              <NavItem icon={<LibraryBigIcon size={20} />} text="Biblioteca" to="/biblioteca" />
              <NavItem icon={<SquarePenIcon size={20} />} text="Escritura" onClick={handleWritingNav} />
            </div>
            <div className="flex flex-col gap-4 mb-4">
              {user && isAuthenticated ? (
                <>
                  <NavItem icon={<UserIcon size={20} />} text="Perfil" onClick={handleProfileNav} />
                  <NavItem icon={<LogOutIcon size={20} />} text="Salir" onClick={handleLogout} />
                </>
              ) : (
                <>
                  <NavItem icon={<UserIcon size={20} />} text="Ingresar" to="/login" />
                  <NavItem icon={<SquarePenIcon size={20} />} text="Registrarse" to="/signup" />
                </>
              )}
            </div>
          </motion.div>
        )}
      </motion.nav>

      <motion.button
        onClick={handleMobileToggle}
        className="md:hidden fixed top-4 left-4 z-50 bg-purple-700 text-white p-2 rounded-full shadow-lg"
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 15 }}
      >
        <motion.div
          key={isMobileMenuOpen ? "close" : "open"}
          initial={{ opacity: 0, rotate: -90 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 90 }}
          transition={{ duration: 0.2 }}
        >
          {isMobileMenuOpen ? <XIcon size={28} /> : <MenuIcon size={28} />}
        </motion.div>
      </motion.button>

      <motion.div
        variants={mobileVariants}
        initial="hidden"
        animate={isMobileMenuOpen ? "visible" : "hidden"}
        className="md:hidden fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-purple-600 to-indigo-700 text-white p-6 shadow-2xl z-40"
      >
        <button onClick={handleMobileToggle} className="text-white mb-6">
          <XIcon size={28} />
        </button>

        <div className="flex flex-col gap-4">
          <NavItem icon={<HomeIcon size={20} />} text="Inicio" to={"/"} />
          <NavItem icon={<LibraryBigIcon size={20} />} text="Biblioteca" to="/biblioteca" />
          <NavItem icon={<SquarePenIcon size={20} />} text="Escritura" onClick={handleWritingNav} />
        </div>

        <div className="flex flex-col gap-4 mt-8">
          {user && isAuthenticated ? (
            <>
              <NavItem icon={<UserIcon size={20} />} text="Perfil" onClick={handleProfileNav} />
              <NavItem icon={<LogOutIcon size={20} />} text="Salir" onClick={handleLogout} />
            </>
          ) : (
            <>
              <NavItem icon={<UserIcon size={20} />} text="Ingresar" to="/login" />
              <NavItem icon={<SquarePenIcon size={20} />} text="Registrarse" to="/signup" />
            </>
          )}
        </div>
      </motion.div>

      {isMobileMenuOpen && (
        <div
          onClick={handleMobileToggle}
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
        />
      )}
    </>
  );
};

const NavItem = ({ icon, text, onClick, to }) => {
  const content = (
    <>
      {icon}
      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {text}
      </motion.span>
    </>
  );

  return to ? (
    <Link to={to}>
      <motion.div
        variants={itemVariants}
        className="flex items-center gap-3 rounded-xl p-3 bg-transparent text-white hover:bg-white hover:text-purple-700 transition duration-200 cursor-pointer"
      >
        {content}
      </motion.div>
    </Link>
  ) : (
    <motion.div
      variants={itemVariants}
      className="flex items-center gap-3 rounded-xl p-3 bg-transparent text-white hover:bg-white hover:text-purple-700 transition duration-200 cursor-pointer"
      onClick={onClick}
    >
      {content}
    </motion.div>
  );
};

export default SideBar;
