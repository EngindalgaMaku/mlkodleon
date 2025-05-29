import React from 'react';
import { Algorithm } from '../types';
import { Sliders } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ParameterControlsProps {
  algorithm: Algorithm;
  parameters: {
    learningRate: number;
    iterations: number;
    regularization: number;
    noiseLevel: number;
  };
  onChange: (name: string, value: number) => void;
  disabled: boolean;
}

const ParameterControls: React.FC<ParameterControlsProps> = ({
  algorithm,
  parameters,
  onChange,
  disabled
}) => {
  const { t } = useTranslation();
  // Get parameter descriptions based on the selected algorithm
  const getParameterDescription = (param: string) => {
    const descriptions: Record<string, Record<string, string>> = {
      learningRate: {
        default: t('parameter_desc_learning_rate_default'),
        linearRegression: t('parameter_desc_learning_rate_linear_regression'),
        logisticRegression: t('parameter_desc_learning_rate_logistic_regression'),
        kMeansClustering: t('parameter_desc_learning_rate_kmeans_clustering'),
        decisionTree: t('parameter_desc_learning_rate_decision_tree')
      },
      iterations: {
        default: t('parameter_desc_iterations_default'),
        linearRegression: t('parameter_desc_iterations_linear_regression'),
        logisticRegression: t('parameter_desc_iterations_logistic_regression'),
        kMeansClustering: t('parameter_desc_iterations_kmeans_clustering'),
        decisionTree: t('parameter_desc_iterations_decision_tree')
      },
      regularization: {
        default: t('parameter_desc_regularization_default'),
        linearRegression: t('parameter_desc_regularization_linear_regression'),
        logisticRegression: t('parameter_desc_regularization_logistic_regression'),
        kMeansClustering: t('parameter_desc_regularization_kmeans_clustering'),
        decisionTree: t('parameter_desc_regularization_decision_tree')
      },
      noiseLevel: {
        default: t('parameter_desc_noise_level_default'),
      }
    };

    return descriptions[param][algorithm] || descriptions[param].default;
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
      <div className="flex items-center mb-4">
        <Sliders className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('parameters_title')}</h2>
      </div>
      
      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('parameter_learning_rate')}
            </label>
            <span className="text-sm text-blue-600 dark:text-blue-400 font-mono">
              {parameters.learningRate.toFixed(4)}
            </span>
          </div>
          <input
            type="range"
            min="0.0001"
            max="0.1"
            step="0.0001"
            value={parameters.learningRate}
            onChange={(e) => onChange('learningRate', parseFloat(e.target.value))}
            disabled={disabled}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {getParameterDescription('learningRate')}
          </p>
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('parameter_iterations')}
            </label>
            <span className="text-sm text-blue-600 dark:text-blue-400 font-mono">
              {parameters.iterations}
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="500"
            step="10"
            value={parameters.iterations}
            onChange={(e) => onChange('iterations', parseInt(e.target.value))}
            disabled={disabled}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {getParameterDescription('iterations')}
          </p>
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('parameter_regularization')}
            </label>
            <span className="text-sm text-blue-600 dark:text-blue-400 font-mono">
              {parameters.regularization.toFixed(4)}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="0.1"
            step="0.0001"
            value={parameters.regularization}
            onChange={(e) => onChange('regularization', parseFloat(e.target.value))}
            disabled={disabled}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {getParameterDescription('regularization')}
          </p>
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('parameter_noise_level')}
            </label>
            <span className="text-sm text-blue-600 dark:text-blue-400 font-mono">
              {parameters.noiseLevel.toFixed(2)}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={parameters.noiseLevel}
            onChange={(e) => onChange('noiseLevel', parseFloat(e.target.value))}
            disabled={disabled}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {getParameterDescription('noiseLevel')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ParameterControls;