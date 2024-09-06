import { motion } from 'framer-motion';

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

export default Step;