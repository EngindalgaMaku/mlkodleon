import React, { useEffect, useRef } from 'react';
import { Algorithm, DataPoint } from '../types';
import { drawVisualization } from '../utils/visualizationEngine';
import { useTranslation } from 'react-i18next';

interface VisualizationProps {
  algorithm: Algorithm;
  data: DataPoint[];
  results: any;
  currentIteration: number;
  maxIterations: number;
}

const Visualization: React.FC<VisualizationProps> = ({
  algorithm,
  data,
  results,
  currentIteration,
  maxIterations
}) => {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    console.log('Visualization useEffect triggered, results:', results);
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size to match container dimensions
    const container = canvas.parentElement;
    if (container) {
      canvas.width = container.clientWidth;
      canvas.height = 400; // Fixed height
    }
    
    // Draw the visualization
    drawVisualization(ctx, algorithm, data, results, currentIteration);
    
  }, [algorithm, data, results, currentIteration]);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;
      
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        // Height stays constant
      }
      
      // Redraw after resize
      drawVisualization(ctx, algorithm, data, results, currentIteration);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [algorithm, data, results, currentIteration]);
  
  return (
    <div className="relative">
      <div className="visualization-container w-full h-[400px] bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden transition-colors duration-200">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
        />
      </div>
      
      {currentIteration > 0 && currentIteration < maxIterations && (
        <div className="mt-4">
          <div className="flex justify-between mb-1 text-xs text-gray-600 dark:text-gray-400">
            <span>{t('visualization_progress')}</span>
            <span>{Math.round((currentIteration / maxIterations) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div 
              className="bg-blue-600 h-2.5 rounded-full dark:bg-blue-500 transition-all duration-200" 
              style={{ width: `${(currentIteration / maxIterations) * 100}%` }}
            ></div>
          </div>
        </div>
      )}
      
      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        {getVisualizationDescription(algorithm, t)}
      </div>
    </div>
  );
};

const getVisualizationDescription = (algorithm: Algorithm, t: any) => {
  switch (algorithm) {
    case 'linearRegression':
      return t('visualization_description_linear_regression');
    case 'logisticRegression':
      return t('visualization_description_logistic_regression');
    case 'kMeansClustering':
      return t('visualization_description_kmeans_clustering');
    case 'decisionTree':
      return t('visualization_description_decision_tree');
    default:
      return t('visualization_description_default');
  }
};

export default Visualization;