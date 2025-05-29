import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AlgorithmSelector from './AlgorithmSelector';
import ParameterControls from './ParameterControls';
import DataGenerator from './DataGenerator';
import Visualization from './Visualization';
import MetricsPanel from './MetricsPanel';
import { Algorithm, DataPoint } from '../types';
import { generateRandomData } from '../utils/dataGenerators';
import { runSimulation } from '../utils/simulationEngine';

const MLSimulation: React.FC = () => {
  const { t } = useTranslation();
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm>('linearRegression');
  const [parameters, setParameters] = useState({
    learningRate: 0.01,
    iterations: 100,
    regularization: 0.001,
    noiseLevel: 0.2,
  });
  const [data, setData] = useState<DataPoint[]>(() => generateRandomData(selectedAlgorithm, 50, parameters.noiseLevel));
  const [simulationResults, setSimulationResults] = useState<any>(null);
  const [isTraining, setIsTraining] = useState(false);
  const [currentIteration, setCurrentIteration] = useState(0);

  const handleAlgorithmChange = (algorithm: Algorithm) => {
    setSelectedAlgorithm(algorithm);
    // Generate new data appropriate for the selected algorithm
    setData(generateRandomData(algorithm, 50, parameters.noiseLevel));
    setSimulationResults(null);
    setCurrentIteration(0);
  };

  const handleParameterChange = (name: string, value: number) => {
    setParameters(prev => ({ ...prev, [name]: value }));
    
    // If noise level changes, regenerate data
    if (name === 'noiseLevel') {
      setData(generateRandomData(selectedAlgorithm, 50, value));
    }
  };

  const handleGenerateData = (count: number) => {
    setData(generateRandomData(selectedAlgorithm, count, parameters.noiseLevel));
    setSimulationResults(null);
    setCurrentIteration(0);
  };

  const handleRunSimulation = async () => {
    setIsTraining(true);
    setCurrentIteration(0);
    
    // Run the simulation with progress updates
    const results = await runSimulation(
      selectedAlgorithm, 
      data, 
      parameters,
      (iteration) => {
        setCurrentIteration(iteration);
      }
    );
    
    setSimulationResults(results);
    setIsTraining(false);
    console.log('Simulation results received:', results);
  };

  const algorithmOptions = [
    { value: 'linearRegression', label: t('algorithm_linear_regression') },
    { value: 'logisticRegression', label: t('algorithm_logistic_regression') },
    { value: 'kMeansClustering', label: t('algorithm_kmeans_clustering') },
    { value: 'decisionTree', label: t('algorithm_decision_tree') },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('title')}</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {t('description')}
        </p>
        
        <AlgorithmSelector 
          options={algorithmOptions} 
          selectedAlgorithm={selectedAlgorithm} 
          onSelect={handleAlgorithmChange} 
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <ParameterControls 
            algorithm={selectedAlgorithm} 
            parameters={parameters} 
            onChange={handleParameterChange}
            disabled={isTraining}
          />
          
          <DataGenerator 
            algorithm={selectedAlgorithm}
            onGenerate={handleGenerateData}
            currentCount={data.length}
            disabled={isTraining}
          />
        </div>
        
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Visualization</h2>
              <button
                onClick={handleRunSimulation}
                disabled={isTraining}
                className={`px-4 py-2 rounded-md text-white font-medium transition-colors ${
                  isTraining 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
                }`}
              >
                {isTraining ? t('training_button_progress', { current: currentIteration, total: parameters.iterations }) : t('run_simulation_button')}
              </button>
            </div>
            
            <Visualization 
              algorithm={selectedAlgorithm}
              data={data}
              results={simulationResults}
              currentIteration={currentIteration}
              maxIterations={parameters.iterations}
            />
          </div>
          
          {simulationResults && (
            <MetricsPanel 
              algorithm={selectedAlgorithm}
              results={simulationResults}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MLSimulation;