import { motion } from 'framer-motion';
import { Pen, BookOpen, Book } from 'lucide-react';
import Step from './Step';

const TutorialSection = () => (
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

export default TutorialSection;