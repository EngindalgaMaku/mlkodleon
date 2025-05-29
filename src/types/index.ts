export type Algorithm = 
  | 'linearRegression' 
  | 'logisticRegression' 
  | 'kMeansClustering' 
  | 'decisionTree';

export interface DataPoint {
  x: number;
  y: number;
  label?: number;  // For classification algorithms
  cluster?: number; // For clustering algorithms
}

export interface SimulationParameters {
  learningRate: number;
  iterations: number;
  regularization: number;
  noiseLevel: number;
}

export interface LinearRegressionResults {
  mse: number;      // Mean squared error
  r2: number;       // R-squared score
  slope: number;    // Model slope (coefficient)
  intercept: number; // Model intercept
  predictions: number[]; // Predicted values
  history: {        // Training history
    iteration: number;
    slope: number;
    intercept: number;
    loss: number;
  }[];
}

export interface LogisticRegressionResults {
  accuracy: number;  // Classification accuracy
  precision: number; // Precision score
  recall: number;    // Recall score
  f1: number;        // F1 score
  weights: number[]; // Model weights
  bias: number;      // Model bias
  predictions: number[]; // Predicted labels
  probabilities: number[]; // Predicted probabilities
  history: {         // Training history
    iteration: number;
    weights: number[];
    bias: number;
    loss: number;
  }[];
}

export interface KMeansResults {
  inertia: number;    // Sum of squared distances to centroids
  silhouette: number; // Silhouette score
  iterations: number; // Number of iterations until convergence
  clusters: number;   // Number of clusters
  centroids: DataPoint[]; // Final centroids
  assignments: number[]; // Cluster assignments for each point
  history: {          // Training history
    iteration: number;
    centroids: DataPoint[];
    inertia: number;
  }[];
}

export interface DecisionTreeResults {
  accuracy: number;   // Classification accuracy
  depth: number;      // Tree depth
  nodes: number;      // Number of nodes
  gini: number;       // Average Gini impurity
  boundaries: any[];  // Decision boundaries
  predictions: number[]; // Predicted labels
}