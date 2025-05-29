import React, { useState } from 'react';
import { Database, BarChart } from 'lucide-react';
import { Algorithm } from '../types';
import { useTranslation } from 'react-i18next';

interface DataGeneratorProps {
  algorithm: Algorithm;
  onGenerate: (count: number) => void;
  currentCount: number;
  disabled: boolean;
}

const DataGenerator: React.FC<DataGeneratorProps> = ({
  algorithm,
  onGenerate,
  currentCount,
  disabled
}) => {
  const { t } = useTranslation();
  const [dataCount, setDataCount] = useState(50);

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataCount(parseInt(e.target.value));
  };

  const getDataDescription = () => {
    switch (algorithm) {
      case 'linearRegression':
        return t('data_description_linear_regression');
      case 'logisticRegression':
        return t('data_description_logistic_regression');
      case 'kMeansClustering':
        return t('data_description_kmeans_clustering');
      case 'decisionTree':
        return t('data_description_decision_tree');
      default:
        return t('data_description_default');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
      <div className="flex items-center mb-4">
        <Database className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('data_generation_title')}</h2>
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          {getDataDescription()}
        </p>
        <div className="flex items-center">
          <BarChart className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {t('data_current_count', { count: currentCount })}
          </span>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('data_points_label')}
          </label>
          <span className="text-sm text-blue-600 dark:text-blue-400 font-mono">
            {dataCount}
          </span>
        </div>
        <input
          type="range"
          min="10"
          max="200"
          step="5"
          value={dataCount}
          onChange={handleCountChange}
          disabled={disabled}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
      </div>
      
      <button
        onClick={() => onGenerate(dataCount)}
        disabled={disabled}
        className={`w-full px-4 py-2 rounded-md text-white font-medium transition-colors ${
          disabled 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600'
        }`}
      >
        {t('generate_new_data_button')}
      </button>
    </div>
  );
};

export default DataGenerator;