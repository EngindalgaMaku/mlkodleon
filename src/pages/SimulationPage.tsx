import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { generateRandomData } from '../utils/dataGenerators';
import { Algorithm, DataPoint, SimulationParameters } from '../types'; // Import necessary types
import { runSimulation } from '../utils/simulationEngine'; // Import simulation engine function
import Visualization from '../components/Visualization'; // Import Visualization component
import MetricsPanel from '../components/MetricsPanel'; // Import MetricsPanel component

const SimulationPage: React.FC = () => {
  const { t } = useTranslation();
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm>('linearRegression');
  const [parameters, setParameters] = useState({
    linear_regression: { learning_rate: 0.01, iterations: 100, regularization: 0, noise_level: 0.1 },
    logistic_regression: { learning_rate: 0.01, iterations: 100, regularization: 0, noise_level: 0.1 },
    kmeans_clustering: { iterations: 100, clusters: 3, noise_level: 0.1 },
    decision_tree: { iterations: 5, noise_level: 0.1 }, // iterations used for max_depth
  });
  const [dataPoints, setDataPoints] = useState(100);
  const [noiseLevel, setNoiseLevel] = useState(0.1); // Keeping noise here for data generation controls
  const [data, setData] = useState<any[]>([]); // State to hold generated data
  const [simulationResults, setSimulationResults] = useState<any>(null); // State to hold simulation results
  const [currentIteration, setCurrentIteration] = useState(0); // State to track current iteration for visualization
  const [isTraining, setIsTraining] = useState(false); // State to indicate if simulation is running

  // Function to generate data - TODO: Implement actual data generation logic
  const generateData = () => {
    // Cast selectedAlgorithm to Algorithm type for the data generation function
    const algorithmType = selectedAlgorithm as Algorithm;
    const generatedData = generateRandomData(algorithmType, dataPoints, noiseLevel);
    setData(generatedData);
    console.log('Generated data:', generatedData);
    setSimulationResults(null); // Reset results when new data is generated
    setCurrentIteration(0); // Reset iteration count
  };

  // Function to run the simulation
  const runSimulationHandler = async () => {
    setIsTraining(true);
    setSimulationResults(null); // Reset previous results
    setCurrentIteration(0); // Reset iteration count

    // Prepare parameters for the simulation engine
    // The simulation engine expects a flat structure, so map parameters from the nested state
    const simulationParams: SimulationParameters = {
      learningRate: parameters[selectedAlgorithm]?.learning_rate || 0.01,
      iterations: parameters[selectedAlgorithm]?.iterations || 100,
      regularization: parameters[selectedAlgorithm]?.regularization || 0,
      clusters: selectedAlgorithm === 'kmeans_clustering' ? parameters.kmeans_clustering.clusters : undefined, // K-Means specific
      // Add other parameters if needed by the simulation engine
    };

    try {
      // Call the simulation engine function
      const results = await runSimulation(
        selectedAlgorithm as Algorithm,
        data as DataPoint[], // Cast data to DataPoint[]
        simulationParams,
        (iteration: number) => {
          // Update iteration progress
          setCurrentIteration(iteration);
        }
      );
      setSimulationResults(results);
      console.log('Simulation results:', results);
    } catch (error) {
      console.error('Error running simulation:', error);
      // TODO: Display error to user
    } finally {
      setIsTraining(false);
    }
  };

  // Determine max iterations for the current algorithm
  const maxIterations = parameters[selectedAlgorithm]?.iterations || 100; // Default to 100 if undefined

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{t('simulation_page_title', 'Simulation')}</h1> {/* TODO: Add translation key for page title */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Sidebar for Controls */}
        <div className="md:col-span-1">
          {/* Algorithm Selector - TODO: Implement actual selector logic */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t('algorithm_selector_label')}</h2>
            {/* TODO: Implement actual selector logic */}
            <select
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-600"
              value={selectedAlgorithm}
              onChange={(e) => setSelectedAlgorithm(e.target.value as Algorithm)}
            >
              <option value="linear_regression">{t('algorithm_linear_regression')}</option>
              <option value="logistic_regression">{t('algorithm_logistic_regression')}</option>
              <option value="kmeans_clustering">{t('algorithm_kmeans_clustering')}</option>
              <option value="decision_tree">{t('algorithm_decision_tree')}</option>
            </select>
          </div>

          {/* Parameters Panel */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t('parameters_title')}</h2>
            {/* TODO: Add tooltips or descriptions for parameters */}
            <div className="space-y-4">
              {selectedAlgorithm === 'linear_regression' && (
                <>
                  {/* Linear Regression Parameters */}
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('parameter_learning_rate')}</label>
                  <input type="number" step="0.01" value={parameters.linear_regression.learning_rate} onChange={(e) => setParameters({...parameters, linear_regression: {...parameters.linear_regression, learning_rate: parseFloat(e.target.value)}})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('parameter_iterations')}</label>
                  <input type="number" step="1" value={parameters.linear_regression.iterations} onChange={(e) => setParameters({...parameters, linear_regression: {...parameters.linear_regression, iterations: parseInt(e.target.value, 10)}})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('parameter_regularization')}</label>
                  <input type="number" step="0.01" value={parameters.linear_regression.regularization} onChange={(e) => setParameters({...parameters, linear_regression: {...parameters.linear_regression, regularization: parseFloat(e.target.value)}})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('parameter_noise_level')}</label>
                  <input type="number" step="0.1" value={parameters.linear_regression.noise_level} onChange={(e) => setParameters({...parameters, linear_regression: {...parameters.linear_regression, noise_level: parseFloat(e.target.value)}})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </>
              )}
              {selectedAlgorithm === 'logistic_regression' && (
                <>
                  {/* Logistic Regression Parameters */}
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('parameter_learning_rate')}</label>
                  <input type="number" step="0.01" value={parameters.logistic_regression.learning_rate} onChange={(e) => setParameters({...parameters, logistic_regression: {...parameters.logistic_regression, learning_rate: parseFloat(e.target.value)}})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('parameter_iterations')}</label>
                  <input type="number" step="1" value={parameters.logistic_regression.iterations} onChange={(e) => setParameters({...parameters, logistic_regression: {...parameters.logistic_regression, iterations: parseInt(e.target.value, 10)}})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('parameter_regularization')}</label>
                  <input type="number" step="0.01" value={parameters.logistic_regression.regularization} onChange={(e) => setParameters({...parameters, logistic_regression: {...parameters.logistic_regression, regularization: parseFloat(e.target.value)}})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('parameter_noise_level')}</label>
                  <input type="number" step="0.1" value={parameters.logistic_regression.noise_level} onChange={(e) => setParameters({...parameters, logistic_regression: {...parameters.logistic_regression, noise_level: parseFloat(e.target.value)}})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </>
              )}
              {selectedAlgorithm === 'kmeans_clustering' && (
                <>
                  {/* K-Means Clustering Parameters */}
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('parameter_iterations')}</label>
                  <input type="number" step="1" value={parameters.kmeans_clustering.iterations} onChange={(e) => setParameters({...parameters, kmeans_clustering: {...parameters.kmeans_clustering, iterations: parseInt(e.target.value, 10)}})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('metric_name_clusters')}</label>
                  <input type="number" step="1" value={parameters.kmeans_clustering.clusters} onChange={(e) => setParameters({...parameters, kmeans_clustering: {...parameters.kmeans_clustering, clusters: parseInt(e.target.value, 10)}})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('parameter_noise_level')}</label>
                  <input type="number" step="0.1" value={parameters.kmeans_clustering.noise_level} onChange={(e) => setParameters({...parameters, kmeans_clustering: {...parameters.kmeans_clustering, noise_level: parseFloat(e.target.value)}})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </>
              )}
              {selectedAlgorithm === 'decision_tree' && (
                <>
                  {/* Decision Tree Parameters */}
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('parameter_iterations')}</label> {/* Using iterations for max_depth concept */}
                  <input type="number" step="1" value={parameters.decision_tree.iterations} onChange={(e) => setParameters({...parameters, decision_tree: {...parameters.decision_tree, iterations: parseInt(e.target.value, 10)}})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" /> {/* TODO: Manage parameter state - max_depth */}
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('parameter_noise_level')}</label>
                  <input type="number" step="0.1" value={parameters.decision_tree.noise_level} onChange={(e) => setParameters({...parameters, decision_tree: {...parameters.decision_tree, noise_level: parseFloat(e.target.value)}})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                  {/* Decision Tree often uses max_depth, min_samples_split, etc. Using iterations as a simplification for max_depth for now. */}
                </>
              )}
            </div>
          </div>

          {/* Data Generation Panel */}
          <div>
             <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t('data_generation_title')}</h2>
             <div className="space-y-4">
               {/* Number of Data Points */}
               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('data_points_label')}</label>
               <input
                 type="number"
                 step="10"
                 value={dataPoints}
                 onChange={(e) => setDataPoints(parseInt(e.target.value, 10))}
                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
               />
                {/* Noise Level for Data Generation - Moved from parameters */}
                 {/* Keeping noise here for data generation controls */}
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('parameter_noise_level')}</label>
                <input
                  type="number"
                  step="0.1"
                  value={noiseLevel}
                  onChange={(e) => setNoiseLevel(parseFloat(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                 {/* We can decide later if noise is purely a data generation param or also an algorithm param */}
             </div>
             {/* Generate Data Button */}
              <div className="mt-6">
                <button
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:bg-blue-700 dark:hover:bg-blue-800"
                  onClick={generateData}
                 >
                  {t('generate_new_data_button')}
                </button>
              </div>
          </div>
        </div>

        {/* Main Content Area for Visualization and Metrics */}
        <div className="md:col-span-2">
          {/* Visualization Area */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 flex flex-col" style={{ minHeight: '400px' }}> {/* TODO: Adjust minHeight as needed */}
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t('visualization_title')}</h2>
            {/* Visualization Component */}
            <Visualization
              algorithm={selectedAlgorithm as Algorithm}
              data={data}
              results={simulationResults}
              currentIteration={currentIteration}
              maxIterations={maxIterations}
            />
          </div>

          {/* Metrics Panel */}
          <MetricsPanel algorithm={selectedAlgorithm as Algorithm} results={simulationResults} />
        </div>
      </div>

      {/* Run Simulation Button - TODO: Implement simulation logic */}
       <div className="mt-8 text-center">
            <button
              className="w-full bg-green-600 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 dark:bg-green-700 dark:hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={runSimulationHandler}
              disabled={isTraining || data.length === 0} // Disable if training or no data
            >
              {isTraining ? t('running_simulation_button') : t('run_simulation_button')}
            </button>
       </div>


    </div>
  );
};

export default SimulationPage; 