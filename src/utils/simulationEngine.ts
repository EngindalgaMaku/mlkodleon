import { Algorithm, DataPoint, SimulationParameters } from '../types';

/**
 * Runs a machine learning simulation based on the selected algorithm and parameters
 */
export const runSimulation = async (
  algorithm: Algorithm,
  data: DataPoint[],
  parameters: SimulationParameters,
  onProgress: (iteration: number) => void
): Promise<any> => {
  switch (algorithm) {
    case 'linearRegression':
      return simulateLinearRegression(data, parameters, onProgress);
    case 'logisticRegression':
      return simulateLogisticRegression(data, parameters, onProgress);
    case 'kMeansClustering':
      return simulateKMeansClustering(data, parameters, onProgress);
    case 'decisionTree':
      return simulateDecisionTree(data, parameters, onProgress);
    default:
      throw new Error(`Algorithm ${algorithm} not implemented`);
  }
};

/**
 * Simulates linear regression using gradient descent
 */
const simulateLinearRegression = async (
  data: DataPoint[],
  parameters: SimulationParameters,
  onProgress: (iteration: number) => void
): Promise<any> => {
  const { learningRate, iterations, regularization } = parameters;
  
  // Initialize model parameters
  let slope = Math.random() * 2 - 1; // Random initial slope
  let intercept = Math.random() * 2 - 1; // Random initial intercept
  
  const history: any[] = [];
  
  // Gradient descent
  for (let i = 0; i < iterations; i++) {
    // To make the UI more responsive, we'll only update progress periodically
    if (i % 5 === 0 || i === iterations - 1) {
      onProgress(i + 1);
      
      // Allow UI to update
      await new Promise(resolve => setTimeout(resolve, 0));
    }
    
    let slopeGradient = 0;
    let interceptGradient = 0;
    let loss = 0;
    
    // Calculate gradients
    for (const point of data) {
      const prediction = slope * point.x + intercept;
      const error = prediction - point.y;
      
      slopeGradient += error * point.x;
      interceptGradient += error;
      loss += error * error;
    }
    
    // Average the gradients
    slopeGradient /= data.length;
    interceptGradient /= data.length;
    loss /= data.length;
    
    // Add regularization to prevent overfitting
    slopeGradient += regularization * slope;
    
    // Update parameters
    slope -= learningRate * slopeGradient;
    intercept -= learningRate * interceptGradient;
    
    // Record history
    history.push({
      iteration: i,
      slope,
      intercept,
      loss
    });
  }
  
  // Calculate final predictions and metrics
  const predictions = data.map(point => slope * point.x + intercept);
  
  // Calculate mean squared error
  const mse = predictions.reduce((sum, pred, i) => {
    const error = pred - data[i].y;
    return sum + error * error;
  }, 0) / data.length;
  
  // Calculate R-squared
  const mean = data.reduce((sum, point) => sum + point.y, 0) / data.length;
  const totalVariance = data.reduce((sum, point) => {
    const diff = point.y - mean;
    return sum + diff * diff;
  }, 0);
  const explainedVariance = data.reduce((sum, point, i) => {
    const diff = predictions[i] - mean;
    return sum + diff * diff;
  }, 0);
  const r2 = explainedVariance / totalVariance;
  
  return {
    slope,
    intercept,
    mse,
    r2,
    predictions,
    history
  };
};

/**
 * Simulates logistic regression for binary classification
 */
const simulateLogisticRegression = async (
  data: DataPoint[],
  parameters: SimulationParameters,
  onProgress: (iteration: number) => void
): Promise<any> => {
  const { learningRate, iterations, regularization } = parameters;
  
  // Initialize model parameters
  let weights = [Math.random() * 0.2 - 0.1, Math.random() * 0.2 - 0.1]; // Random initial weights
  let bias = Math.random() * 0.2 - 0.1; // Random initial bias
  
  const history: any[] = [];
  
  // Sigmoid function
  const sigmoid = (z: number) => 1 / (1 + Math.exp(-z));
  
  // Gradient descent
  for (let i = 0; i < iterations; i++) {
    // Update progress periodically
    if (i % 5 === 0 || i === iterations - 1) {
      onProgress(i + 1);
      
      // Allow UI to update
      await new Promise(resolve => setTimeout(resolve, 0));
    }
    
    const weightGradients = [0, 0];
    let biasGradient = 0;
    let loss = 0;
    
    // Calculate gradients
    for (const point of data) {
      // Compute prediction
      const z = weights[0] * point.x + weights[1] * point.y + bias;
      const prediction = sigmoid(z);
      const target = point.label || 0;
      
      // Compute error
      const error = prediction - target;
      
      // Update gradients
      weightGradients[0] += error * point.x;
      weightGradients[1] += error * point.y;
      biasGradient += error;
      
      // Compute loss (binary cross-entropy)
      loss -= target * Math.log(prediction) + (1 - target) * Math.log(1 - prediction);
    }
    
    // Average the gradients
    weightGradients[0] /= data.length;
    weightGradients[1] /= data.length;
    biasGradient /= data.length;
    loss /= data.length;
    
    // Add regularization
    weightGradients[0] += regularization * weights[0];
    weightGradients[1] += regularization * weights[1];
    
    // Update parameters
    weights[0] -= learningRate * weightGradients[0];
    weights[1] -= learningRate * weightGradients[1];
    bias -= learningRate * biasGradient;
    
    // Record history
    history.push({
      iteration: i,
      weights: [...weights],
      bias,
      loss
    });
  }
  
  // Calculate final predictions
  const probabilities = data.map(point => {
    const z = weights[0] * point.x + weights[1] * point.y + bias;
    return sigmoid(z);
  });
  
  const predictions = probabilities.map(prob => prob >= 0.5 ? 1 : 0);
  
  // Calculate metrics
  let truePositives = 0;
  let falsePositives = 0;
  let trueNegatives = 0;
  let falseNegatives = 0;
  
  for (let i = 0; i < data.length; i++) {
    const actual = data[i].label || 0;
    const predicted = predictions[i];
    
    if (actual === 1 && predicted === 1) truePositives++;
    else if (actual === 0 && predicted === 1) falsePositives++;
    else if (actual === 0 && predicted === 0) trueNegatives++;
    else if (actual === 1 && predicted === 0) falseNegatives++;
  }
  
  const accuracy = (truePositives + trueNegatives) / data.length;
  const precision = truePositives / (truePositives + falsePositives) || 0;
  const recall = truePositives / (truePositives + falseNegatives) || 0;
  const f1 = 2 * precision * recall / (precision + recall) || 0;
  
  return {
    weights,
    bias,
    accuracy,
    precision,
    recall,
    f1,
    predictions,
    probabilities,
    history
  };
};

/**
 * Simulates K-means clustering
 */
const simulateKMeansClustering = async (
  data: DataPoint[],
  parameters: SimulationParameters,
  onProgress: (iteration: number) => void
): Promise<any> => {
  const { iterations } = parameters;
  const k = 3; // Number of clusters
  
  // Initialize centroids randomly
  let centroids: DataPoint[] = [];
  for (let i = 0; i < k; i++) {
    // Pick random data points as initial centroids
    const randomIndex = Math.floor(Math.random() * data.length);
    centroids.push({ ...data[randomIndex] });
  }
  
  // Assign each point to the closest centroid
  const getClosestCentroidIndex = (point: DataPoint) => {
    let minDistance = Infinity;
    let closestIndex = 0;
    
    for (let i = 0; i < centroids.length; i++) {
      const centroid = centroids[i];
      const distance = Math.sqrt(
        Math.pow(point.x - centroid.x, 2) + Math.pow(point.y - centroid.y, 2)
      );
      
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }
    
    return closestIndex;
  };
  
  // History of centroids and assignments
  const history: any[] = [];
  let assignments: number[] = [];
  let inertia = Infinity;
  let iterationCount = 0;
  
  // Run the algorithm
  for (let iter = 0; iter < iterations; iter++) {
    onProgress(iter + 1);
    
    // Allow UI to update
    await new Promise(resolve => setTimeout(resolve, 0));
    
    // Assign each point to the closest centroid
    assignments = data.map(getClosestCentroidIndex);
    
    // Update centroids based on assignments
    const newCentroids: DataPoint[] = Array(k).fill(null).map(() => ({ x: 0, y: 0 }));
    const counts = Array(k).fill(0);
    
    for (let i = 0; i < data.length; i++) {
      const point = data[i];
      const clusterIndex = assignments[i];
      
      newCentroids[clusterIndex].x += point.x;
      newCentroids[clusterIndex].y += point.y;
      counts[clusterIndex]++;
    }
    
    // Calculate mean position for each centroid
    for (let i = 0; i < k; i++) {
      if (counts[i] > 0) {
        newCentroids[i].x /= counts[i];
        newCentroids[i].y /= counts[i];
      }
    }
    
    // Calculate inertia (sum of squared distances to closest centroid)
    let newInertia = 0;
    for (let i = 0; i < data.length; i++) {
      const point = data[i];
      const centroid = centroids[assignments[i]];
      const distance = Math.sqrt(
        Math.pow(point.x - centroid.x, 2) + Math.pow(point.y - centroid.y, 2)
      );
      newInertia += distance * distance;
    }
    
    // Record history
    history.push({
      iteration: iter,
      centroids: [...centroids],
      inertia: newInertia
    });
    
    // Check for convergence
    const centroidsChanged = centroids.some((centroid, i) => {
      return Math.abs(centroid.x - newCentroids[i].x) > 0.001 || 
             Math.abs(centroid.y - newCentroids[i].y) > 0.001;
    });
    
    if (!centroidsChanged) {
      iterationCount = iter + 1;
      break;
    }
    
    centroids = newCentroids;
    inertia = newInertia;
    iterationCount = iter + 1;
  }
  
  // Calculate silhouette score (simplified version)
  let silhouette = 0;
  
  for (let i = 0; i < data.length; i++) {
    const point = data[i];
    const assignedCluster = assignments[i];
    
    // Calculate average distance to points in the same cluster (a)
    let intraClusterDistSum = 0;
    let intraClusterCount = 0;
    
    for (let j = 0; j < data.length; j++) {
      if (assignments[j] === assignedCluster && i !== j) {
        const distance = Math.sqrt(
          Math.pow(point.x - data[j].x, 2) + Math.pow(point.y - data[j].y, 2)
        );
        intraClusterDistSum += distance;
        intraClusterCount++;
      }
    }
    
    const a = intraClusterCount > 0 ? intraClusterDistSum / intraClusterCount : 0;
    
    // Calculate the minimum average distance to points in a different cluster (b)
    let minInterClusterDistAvg = Infinity;
    
    for (let cluster = 0; cluster < k; cluster++) {
      if (cluster !== assignedCluster) {
        let interClusterDistSum = 0;
        let interClusterCount = 0;
        
        for (let j = 0; j < data.length; j++) {
          if (assignments[j] === cluster) {
            const distance = Math.sqrt(
              Math.pow(point.x - data[j].x, 2) + Math.pow(point.y - data[j].y, 2)
            );
            interClusterDistSum += distance;
            interClusterCount++;
          }
        }
        
        const avgDist = interClusterCount > 0 ? interClusterDistSum / interClusterCount : Infinity;
        minInterClusterDistAvg = Math.min(minInterClusterDistAvg, avgDist);
      }
    }
    
    const b = minInterClusterDistAvg;
    
    // Calculate silhouette for this point
    const pointSilhouette = intraClusterCount > 0 ? (b - a) / Math.max(a, b) : 0;
    silhouette += pointSilhouette;
  }
  
  silhouette /= data.length;
  
  return {
    centroids,
    assignments,
    inertia,
    silhouette,
    iterations: iterationCount,
    clusters: k,
    history
  };
};

/**
 * Simulates a simplified decision tree algorithm
 */
const simulateDecisionTree = async (
  data: DataPoint[],
  parameters: SimulationParameters,
  onProgress: (iteration: number) => void
): Promise<any> => {
  const { iterations, regularization } = parameters;
  const maxDepth = Math.min(10, Math.floor(iterations / 10)); // Cap depth based on iterations
  
  // Counter for tracking progress
  let currentIteration = 0;
  const updateProgress = () => {
    currentIteration++;
    if (currentIteration % 5 === 0 || currentIteration === iterations) {
      onProgress(currentIteration);
    }
  };
  
  // Simple tree node structure
  type TreeNode = {
    isLeaf: boolean;
    prediction?: number;
    feature?: 'x' | 'y';
    threshold?: number;
    left?: TreeNode;
    right?: TreeNode;
    depth: number;
  };
  
  // Calculate Gini impurity
  const calculateGini = (labels: number[]) => {
    const counts: Record<number, number> = {};
    for (const label of labels) {
      counts[label] = (counts[label] || 0) + 1;
    }
    
    let impurity = 1;
    for (const count of Object.values(counts)) {
      const probability = count / labels.length;
      impurity -= probability * probability;
    }
    
    return impurity;
  };
  
  // Get most common label
  const getMajorityLabel = (labels: number[]) => {
    const counts: Record<number, number> = {};
    for (const label of labels) {
      counts[label] = (counts[label] || 0) + 1;
    }
    
    let majorityLabel = 0;
    let maxCount = 0;
    for (const [label, count] of Object.entries(counts)) {
      if (count > maxCount) {
        maxCount = count;
        majorityLabel = parseInt(label);
      }
    }
    
    return majorityLabel;
  };
  
  // Find the best split
  const findBestSplit = (dataIndices: number[]) => {
    const labels = dataIndices.map(i => data[i].label || 0);
    const currentGini = calculateGini(labels);
    
    let bestGain = -Infinity;
    let bestFeature: 'x' | 'y' = 'x';
    let bestThreshold = 0;
    let bestLeftIndices: number[] = [];
    let bestRightIndices: number[] = [];
    
    // Try different features
    for (const feature of ['x', 'y'] as const) {
      // Sort data by feature
      const sortedIndices = [...dataIndices].sort((a, b) => data[a][feature] - data[b][feature]);
      
      // Try different thresholds
      for (let i = 0; i < sortedIndices.length - 1; i++) {
        updateProgress();
        
        const currentValue = data[sortedIndices[i]][feature];
        const nextValue = data[sortedIndices[i + 1]][feature];
        
        // Skip if values are the same
        if (currentValue === nextValue) continue;
        
        const threshold = (currentValue + nextValue) / 2;
        
        // Split data
        const leftIndices = dataIndices.filter(i => data[i][feature] <= threshold);
        const rightIndices = dataIndices.filter(i => data[i][feature] > threshold);
        
        // Skip if split is too unbalanced (regularization)
        const minSize = Math.floor(dataIndices.length * regularization);
        if (leftIndices.length < minSize || rightIndices.length < minSize) continue;
        
        // Calculate Gini for children
        const leftLabels = leftIndices.map(i => data[i].label || 0);
        const rightLabels = rightIndices.map(i => data[i].label || 0);
        
        const leftGini = calculateGini(leftLabels);
        const rightGini = calculateGini(rightLabels);
        
        // Calculate weighted Gini
        const weightedGini = 
          (leftLabels.length / labels.length) * leftGini + 
          (rightLabels.length / labels.length) * rightGini;
        
        // Calculate information gain
        const gain = currentGini - weightedGini;
        
        if (gain > bestGain) {
          bestGain = gain;
          bestFeature = feature;
          bestThreshold = threshold;
          bestLeftIndices = leftIndices;
          bestRightIndices = rightIndices;
        }
      }
    }
    
    return {
      feature: bestFeature,
      threshold: bestThreshold,
      leftIndices: bestLeftIndices,
      rightIndices: bestRightIndices,
      gain: bestGain
    };
  };
  
  // Build the tree recursively
  const buildTree = (dataIndices: number[], depth: number): TreeNode => {
    const labels = dataIndices.map(i => data[i].label || 0);
    
    // Check if we should create a leaf node
    if (
      depth >= maxDepth || // Maximum depth reached
      new Set(labels).size <= 1 || // All samples have the same label
      dataIndices.length <= 5 || // Too few samples
      currentIteration >= iterations // Reached iteration limit
    ) {
      return {
        isLeaf: true,
        prediction: getMajorityLabel(labels),
        depth
      };
    }
    
    // Find the best split
    const { feature, threshold, leftIndices, rightIndices, gain } = findBestSplit(dataIndices);
    
    // If no good split was found, create a leaf node
    if (gain <= 0 || leftIndices.length === 0 || rightIndices.length === 0) {
      return {
        isLeaf: true,
        prediction: getMajorityLabel(labels),
        depth
      };
    }
    
    // Create decision node
    const leftChild = buildTree(leftIndices, depth + 1);
    const rightChild = buildTree(rightIndices, depth + 1);
    
    return {
      isLeaf: false,
      feature,
      threshold,
      left: leftChild,
      right: rightChild,
      depth
    };
  };
  
  // Start building the tree
  const allIndices = Array.from({ length: data.length }, (_, i) => i);
  const tree = buildTree(allIndices, 0);
  
  // Fill remaining iterations
  while (currentIteration < iterations) {
    updateProgress();
    await new Promise(resolve => setTimeout(resolve, 0));
  }
  
  // Count the number of nodes in the tree
  const countNodes = (node: TreeNode): number => {
    if (node.isLeaf) return 1;
    return 1 + countNodes(node.left!) + countNodes(node.right!);
  };
  
  // Get tree depth
  const getDepth = (node: TreeNode): number => {
    if (node.isLeaf) return node.depth;
    return Math.max(getDepth(node.left!), getDepth(node.right!));
  };
  
  // Predict function
  const predict = (point: DataPoint, node: TreeNode): number => {
    if (node.isLeaf) return node.prediction!;
    
    if (point[node.feature!] <= node.threshold!) {
      return predict(point, node.left!);
    } else {
      return predict(point, node.right!);
    }
  };
  
  // Calculate predictions
  const predictions = data.map(point => predict(point, tree));
  
  // Calculate accuracy
  let correctCount = 0;
  for (let i = 0; i < data.length; i++) {
    if (predictions[i] === (data[i].label || 0)) {
      correctCount++;
    }
  }
  const accuracy = correctCount / data.length;
  
  // Calculate average Gini impurity
  let totalGini = 0;
  let leafCount = 0;
  
  const calculateAverageGini = (node: TreeNode) => {
    if (node.isLeaf) {
      // For a leaf node, calculate Gini impurity
      const leafIndices = allIndices.filter(i => predict(data[i], tree) === node.prediction);
      const leafLabels = leafIndices.map(i => data[i].label || 0);
      totalGini += calculateGini(leafLabels);
      leafCount++;
    } else {
      // Recursively calculate for child nodes
      calculateAverageGini(node.left!);
      calculateAverageGini(node.right!);
    }
  };
  
  calculateAverageGini(tree);
  const averageGini = leafCount > 0 ? totalGini / leafCount : 0;
  
  // Extract decision boundaries (simplified)
  const boundaries: any[] = [];
  
  const extractBoundaries = (node: TreeNode, xMin: number, xMax: number, yMin: number, yMax: number) => {
    if (node.isLeaf) return;
    
    if (node.feature === 'x') {
      boundaries.push({
        type: 'vertical',
        x: node.threshold!,
        yMin,
        yMax,
        depth: node.depth
      });
      
      // Recursively extract boundaries for child nodes
      extractBoundaries(node.left!, xMin, node.threshold!, yMin, yMax);
      extractBoundaries(node.right!, node.threshold!, xMax, yMin, yMax);
    } else {
      boundaries.push({
        type: 'horizontal',
        y: node.threshold!,
        xMin,
        xMax,
        depth: node.depth
      });
      
      // Recursively extract boundaries for child nodes
      extractBoundaries(node.left!, xMin, xMax, yMin, node.threshold!);
      extractBoundaries(node.right!, xMin, xMax, node.threshold!, yMax);
    }
  };
  
  // Find data ranges
  const xValues = data.map(p => p.x);
  const yValues = data.map(p => p.y);
  const xMin = Math.min(...xValues);
  const xMax = Math.max(...xValues);
  const yMin = Math.min(...yValues);
  const yMax = Math.max(...yValues);
  
  extractBoundaries(tree, xMin, xMax, yMin, yMax);
  
  return {
    treeDepth: getDepth(tree),
    nodeCount: countNodes(tree),
    accuracy,
    depth: getDepth(tree),
    nodes: countNodes(tree),
    gini: averageGini,
    boundaries,
    predictions
  };
};