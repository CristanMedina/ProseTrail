import { motion } from "framer-motion";

const FloatingShape = ({ size, top, left, delay }) => {
  return (
    <motion.img 
      src="/dragones.svg" 
      alt="Floating Dragon with Books" 
      className={`absolute ${size}`}
      style={{ top, left }}
      animate={{
        y: ["0%", "20%" ,"50%", "0%"],
        x: ["0%", "5%","35%", "0%"], 
        scale: [1, 1.05, 1], 
        rotate: [-2, 2, -2],       
        opacity: [0.8, 1,0.8],    
      }}
      transition={{
        duration: 10,              
        ease: "easeInOut",
        repeat: Infinity,
        delay,
      }}
      aria-hidden="true"
    />
  );
};

export default FloatingShape;
