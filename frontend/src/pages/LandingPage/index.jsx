import { motion } from "framer-motion";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-left"
      >
        <h2 className="text-5xl font-bold text-gray-800 mb-6 leading-tight font-oswald">
          <span className="text-blue-500">Escribe</span>, Publica, <span className="text-blue-500">Conecta</span>:<br />
          Haz que tu Historia Llegue<br />
          al Mundo
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
        className="text-left mr-6"
      >
        <p className="text-2xl text-gray-800 mr-20">
          Prose Trail es tu plataforma para<br />
          crear, compartir y guardar tus relatos.
        </p>
      </motion.div>
      <motion.button
      className="mt-5 py-3 px-4 bg-blue-500 text-white font-bold rounded-lg"
      whileHover={{scale:1.05}}
      whileTap={{scale:0.98}}
      >
        ESCRIBIR
      </motion.button>
    </div>
  );
};

export default LandingPage;

