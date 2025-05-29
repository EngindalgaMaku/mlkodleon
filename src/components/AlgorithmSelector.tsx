import React from 'react';
import { Algorithm } from '../types';

interface AlgorithmOption {
  value: Algorithm;
  label: string;
}

interface AlgorithmSelectorProps {
  options: AlgorithmOption[];
  selectedAlgorithm: Algorithm;
  onSelect: (algorithm: Algorithm) => void;
}

const AlgorithmSelector: React.FC<AlgorithmSelectorProps> = ({ 
  options, 
  selectedAlgorithm, 
  onSelect 
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onSelect(option.value)}
          className={`px-4 py-2 rounded-md transition-all duration-200 ${
            selectedAlgorithm === option.value
              ? 'bg-blue-600 text-white dark:bg-blue-500 shadow-md transform scale-105'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default AlgorithmSelector;