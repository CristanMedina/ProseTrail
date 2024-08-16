import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="fondo-patron min-h-screen flex items-center justify-center relative overflow-hidden">
        <motion.div
          className="w-16 h-16 border-4 border-t-4 border-t-sky-500 border-sky-200 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
    </div>
  )
}

export default LoadingSpinner