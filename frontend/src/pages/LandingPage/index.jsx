import { useState } from "react";
import { motion } from "framer-motion";
import { Book, BookOpen, Pen, ChevronLeft, ChevronRight } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-12">
      <Hero />
      <RecentBooks />
      <HowToUse />
    </div>
  );
};

const Hero = () => (
  <motion.section
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    className="text-center mb-20"
  >
    <motion.h1
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.2, type: "spring" }}
      className="text-6xl font-bold text-gray-800 mb-6 leading-tight font-oswald"
    >
      <span className="text-blue-600">Escribe</span>, Publica, <span className="text-blue-600">Conecta</span>
    </motion.h1>
    <motion.p
      initial={{ y: 50 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.4, type: "spring" }}
      className="text-2xl text-gray-700 mb-8 font-sourceCodePro"
    >
       <p className="text-2xl text-gray-800">
          Prose Trail es tu plataforma para<br />
          crear, compartir y guardar tus relatos.
        </p>
    </motion.p>
    <motion.div
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.6, type: "spring" }}
    >
      <Button primary>COMENZAR A ESCRIBIR</Button>
      <Button secondary>Biblioteca</Button>
    </motion.div>
  </motion.section>
);

const RecentBooks = () => {
  const books = [
    { id: 1, title: "El Viaje Inesperado", author: "Ana García" },
    { id: 2, title: "Sombras del Pasado", author: "Carlos Ruiz" },
    { id: 3, title: "La Ciudad de Cristal", author: "Elena Martínez" },
    { id: 4, title: "El Último Suspiro", author: "David López" },
    { id: 5, title: "Memorias de un Sueño", author: "Isabel Sánchez" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    if (currentIndex < books.length - 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.8 }}
      className="w-full max-w-4xl mb-20"
    >
      <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center font-oswald">Libros Recientes</h2>
      <div className="relative">
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}
          >
            {books.map((book) => (
              <div key={book.id} className="w-1/3 flex-shrink-0 p-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-6 rounded-lg shadow-md h-full"
                >
                  <Book className="w-16 h-16 mb-4 text-blue-600 mx-auto" />
                  <h3 className="text-xl font-bold mb-2 text-center">{book.title}</h3>
                  <p className="text-gray-600 text-center">{book.author}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
        <SliderButton direction="left" onClick={prevSlide} disabled={currentIndex === 0} />
        <SliderButton direction="right" onClick={nextSlide} disabled={currentIndex >= books.length - 3} />
      </div>
    </motion.section>
  );
};

const SliderButton = ({ direction, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`absolute top-1/2 transform -translate-y-1/2 ${
      direction === 'left' ? 'left-0' : 'right-0'
    } bg-blue-100 rounded-full p-2 shadow-md ${
      disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-400'
    }`}
  >
    {direction === 'left' ? (
      <ChevronLeft className="w-6 h-6 text-black" />
    ) : (
      <ChevronRight className="w-6 h-6 text-black" />
    )}
  </button>
);

const HowToUse = () => (
  <motion.section
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1, duration: 0.8 }}
    className="w-full max-w-4xl"
  >
    <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center font-oswald">Cómo Usar Prose Trail</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <Step
        icon={<Pen className="w-12 h-12 text-purple-600" />}
        title="Escribe"
        description="Crea tus historias en nuestro editor intuitivo"
      />
      <Step
        icon={<BookOpen className="w-12 h-12 text-blue-600" />}
        title="Publica"
        description="Comparte tus obras con la comunidad de Prose Trail"
      />
      <Step
        icon={<Book className="w-12 h-12 text-green-600" />}
        title="Conecta"
        description="Interactúa con otros autores y lectores"
      />
    </div>
  </motion.section>
);

const Step = ({ icon, title, description }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white p-6 rounded-lg shadow-lg text-center"
  >
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const Button = ({ children, primary }) => (
  <motion.button
    className={`py-3 px-6 font-bold rounded-full text-lg mr-4 ${
      primary
        ? "bg-blue-600 text-white hover:bg-blue-700"
        : "bg-transparent text-blue-600 border-2 border-blue-600 hover:bg-blue-100"
    }`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.98 }}
  >
    {children}
  </motion.button>
);

export default LandingPage;