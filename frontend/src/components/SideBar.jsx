import { useState, useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { Link } from "react-router-dom";
import { Edit, Book, LogIn, UserPlus, X, Menu } from "lucide-react";

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
    width: "10rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
}

const TopNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerControls = useAnimationControls();

  useEffect(() => {
    if(isOpen) {
      containerControls.start("open");
    } else {
      containerControls.start("close");
    }
  }, [isOpen]);

  const handleOpenClose = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <motion.nav 
        variants={containerVariants} 
        animate={containerControls} 
        initial="close" 
        className="bg-gray-400 bg-opacity-50 backdrop-filter backdrop-blur-xs flex flex-col z-10 gap-20 p-5 absolute top-0 left-0 h-full"
      >
        <div className="flex flex-row w-full justify-between items-center">
          <div className="flex items-center justify-center w-10 h-10 rounded-full">
            <button
              onClick={() => handleOpenClose()}
              className="flex items-center justify-center w-full h-full"
            >
              {isOpen ? <X size={36} /> : <Menu size={36} />}
            </button>
          </div>
          <p className="font-cinzel font-bold text-2xl -rotate-90 whitespace-nowrap absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            Prose Trail
          </p>
        </div>
      </motion.nav>
    </div>
  );
};

export default TopNavbar;

