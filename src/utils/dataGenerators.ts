import { Algorithm, DataPoint } from '../types';

/**
 * Generates random data points appropriate for the specified algorithm
 */
export const generateRandomData = (
  algorithm: Algorithm, 
  count: number = 50,
  noiseLevel: number = 0.2
): DataPoint[] => {
  switch (algorithm) {
    case 'linearRegression':
      return generateLinearData(count, noiseLevel);
    case 'logisticRegression':
      return generateClassificationData(count, noiseLevel);
    case 'kMeansClustering':
      return generateClusterData(count, noiseLevel);
    case 'decisionTree':
      return generateTreeData(count, noiseLevel);
    default:
      return [];
  }
};

/**
 * Generates data with a linear relationship (y = mx + b + noise)
 */
const generateLinearData = (count: number, noiseLevel: number): DataPoint[] => {
  const slope = Math.random() * 2 - 1; // Random slope between -1 and 1
  const intercept = Math.random() * 4 - 2; // Random intercept between -2 and 2
  
  return Array.from({ length: count }, () => {
    const x = Math.random() * 10 - 5; // x between -5 and 5
    const noise = (Math.random() * 2 - 1) * noiseLevel * 3; // Random noise scaled by noise level
    const y = slope * x + intercept + noise;
    
    return { x, y };
  });
};

/**
 * Generates binary classification data with two clusters
 */
const generateClassificationData = (count: number, noiseLevel: number): DataPoint[] => {
  // Create two clusters of points
  const points: DataPoint[] = [];
  
  // Parameters for the two classes
  const centers = [
    { x: -2, y: -2 },
    { x: 2, y: 2 }
  ];
  
  // Generate points for each class
  for (let i = 0; i < count; i++) {
    const classLabel = i % 2; // Alternate between 0 and 1
    const center = centers[classLabel];
    
    // Add noise proportional to the noise level
    const noiseX = (Math.random() * 2 - 1) * noiseLevel * 4;
    const noiseY = (Math.random() * 2 - 1) * noiseLevel * 4;
    
    points.push({
      x: center.x + noiseX,
      y: center.y + noiseY,
      label: classLabel
    });
  }
  
  return points;
};

/**
 * Generates data with multiple clusters for clustering algorithms
 */
const generateClusterData = (count: number, noiseLevel: number): DataPoint[] => {
  const numClusters = 3; // Fixed number of clusters for simplicity
  const points: DataPoint[] = [];
  
  // Generate random cluster centers
  const centers = Array.from({ length: numClusters }, () => ({
    x: Math.random() * 10 - 5,
    y: Math.random() * 10 - 5
  }));
  
  // Generate points around each center
  for (let i = 0; i < count; i++) {
    const clusterIndex = i % numClusters;
    const center = centers[clusterIndex];
    
    // Add noise proportional to the noise level
    const noiseX = (Math.random() * 2 - 1) * noiseLevel * 3;
    const noiseY = (Math.random() * 2 - 1) * noiseLevel * 3;
    
    points.push({
      x: center.x + noiseX,
      y: center.y + noiseY
    });
  }
  
  return points;
};

/**
 * Generates hierarchical data suitable for decision trees
 */
const generateTreeData = (count: number, noiseLevel: number): DataPoint[] => {
  const points: DataPoint[] = [];
  
  // Create a grid-like pattern with 4 quadrants
  for (let i = 0; i < count; i++) {
    const x = Math.random() * 10 - 5;
    const y = Math.random() * 10 - 5;
    
    // Determine label based on quadrant
    let label = 0;
    if (x > 0 && y > 0) label = 0;
    else if (x < 0 && y > 0) label = 1;
    else if (x < 0 && y < 0) label = 0;
    else if (x > 0 && y < 0) label = 1;
    
    // Add some noise to make it more challenging
    if (Math.random() < noiseLevel) {
      label = 1 - label; // Flip the label with probability = noiseLevel
    }
    
    points.push({ x, y, label });
  }
  
  return points;
};