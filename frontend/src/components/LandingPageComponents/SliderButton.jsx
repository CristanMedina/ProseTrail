import { ChevronLeft, ChevronRight } from 'lucide-react';

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

export default SliderButton;