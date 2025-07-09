import { motion } from 'framer-motion';
import { Pen, BookOpen, Book } from 'lucide-react';
import Step from './Step';

const TutorialSection = () => {
  const steps = [
    {
      icon: <BookOpen className="w-12 h-12 text-blue-600" />,
      title: "Busca libros publicados",
      description:
        "Utiliza la barra de búsqueda para encontrar libros publicados en nuestra plataforma. Puedes buscar por título, autor o tema.",
      imageSrc: "tutorial/biblioteca.png",
      imageAlt: "Ejemplo de búsqueda de libros",
    },
    {
      icon: <Pen className="w-12 h-12 text-purple-600" />,
      title: "Escribe tus historias",
      description:
        "Crea y edita tus propias historias en nuestro editor intuitivo, con guardado automático para que no pierdas tus avances.",
      imageSrc: "tutorial/escritura.png",
      imageAlt: "Ejemplo del editor de escritura",
    },
    {
      icon: <Book className="w-12 h-12 text-green-600" />,
      title: "Publica y comparte",
      description:
        "Publica tus libros y compártelos con la comunidad para que otros puedan leerlos.",
      imageSrc: "tutorial/publicar.png",
      imageAlt: "Ejemplo de página de publicación",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="w-full max-w-4xl mx-auto"
    >
      <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center font-oswald">
        Cómo Usar Prose Trail
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map(({ icon, title, description, imageSrc, imageAlt }, idx) => (
          <Step
            key={idx}
            icon={icon}
            title={title}
            description={description}
            imageSrc={imageSrc}
            imageAlt={imageAlt}
          />
        ))}
      </div>
    </motion.section>
  );
};

export default TutorialSection;
