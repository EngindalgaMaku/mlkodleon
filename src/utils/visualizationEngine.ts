import { Algorithm, DataPoint } from '../types';
import i18n from '../i18n';

/**
 * Draws the visualization for the selected algorithm and data
 */
export const drawVisualization = (
  ctx: CanvasRenderingContext2D,
  algorithm: Algorithm,
  data: DataPoint[],
  results: any,
  currentIteration: number
) => {
  // Clear canvas
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
  // Set up coordinate system
  const padding = 30;
  const width = ctx.canvas.width - padding * 2;
  const height = ctx.canvas.height - padding * 2;
  
  // Find data ranges
  const xValues = data.map(p => p.x);
  const yValues = data.map(p => p.y);
  const xMin = Math.min(...xValues);
  const xMax = Math.max(...xValues);
  const yMin = Math.min(...yValues);
  const yMax = Math.max(...yValues);
  
  // Add some padding to the ranges
  const xRange = xMax - xMin || 1;
  const yRange = yMax - yMin || 1;
  const xPadding = xRange * 0.1;
  const yPadding = yRange * 0.1;
  
  // Transform data coordinates to canvas coordinates
  const transformX = (x: number) => {
    return padding + ((x - (xMin - xPadding)) / ((xMax - xMin) + 2 * xPadding)) * width;
  };
  
  const transformY = (y: number) => {
    return ctx.canvas.height - padding - ((y - (yMin - yPadding)) / ((yMax - yMin) + 2 * yPadding)) * height;
  };
  
  // Draw axes
  drawAxes(ctx, transformX, transformY, xMin - xPadding, xMax + xPadding, yMin - yPadding, yMax + yPadding);
  
  // Draw data points
  drawDataPoints(ctx, data, transformX, transformY, algorithm);
  
  // Draw algorithm-specific visualizations
  if (results) {
    switch (algorithm) {
      case 'linearRegression':
        drawLinearRegression(ctx, data, results, transformX, transformY, currentIteration, yMax);
        break;
      case 'logisticRegression':
        drawLogisticRegression(ctx, data, results, transformX, transformY, currentIteration);
        break;
      case 'kMeansClustering':
        drawKMeansClustering(ctx, data, results, transformX, transformY, currentIteration);
        break;
      case 'decisionTree':
        drawDecisionTree(ctx, data, results, transformX, transformY);
        break;
    }
  }
};

/**
 * Draws coordinate axes
 */
const drawAxes = (
  ctx: CanvasRenderingContext2D,
  transformX: (x: number) => number,
  transformY: (y: number) => number,
  xMin: number,
  xMax: number,
  yMin: number,
  yMax: number
) => {
  ctx.strokeStyle = '#ccc';
  ctx.lineWidth = 1;
  
  // Draw x-axis
  const xAxisY = transformY(0);
  if (xAxisY >= 0 && xAxisY <= ctx.canvas.height) {
    ctx.beginPath();
    ctx.moveTo(transformX(xMin), xAxisY);
    ctx.lineTo(transformX(xMax), xAxisY);
    ctx.stroke();
    
    // X-axis label
    ctx.fillStyle = '#888';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(i18n.t('viz_axis_x_label'), transformX(xMax) + 15, xAxisY + 5);
  }
  
  // Draw y-axis
  const yAxisX = transformX(0);
  if (yAxisX >= 0 && yAxisX <= ctx.canvas.width) {
    ctx.beginPath();
    ctx.moveTo(yAxisX, transformY(yMin));
    ctx.lineTo(yAxisX, transformY(yMax));
    ctx.stroke();
    
    // Y-axis label
    ctx.fillStyle = '#888';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(i18n.t('viz_axis_y_label'), yAxisX - 5, transformY(yMax) - 15);
  }
  
  // Draw x-axis ticks
  const xTicks = 5;
  const xStep = (xMax - xMin) / xTicks;
  for (let i = 0; i <= xTicks; i++) {
    const x = xMin + i * xStep;
    const xPos = transformX(x);
    
    ctx.beginPath();
    ctx.moveTo(xPos, transformY(yMin));
    ctx.lineTo(xPos, transformY(yMax));
    ctx.strokeStyle = '#eee';
    ctx.stroke();
    
    // Tick label
    ctx.fillStyle = '#888';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(x.toFixed(1), xPos, ctx.canvas.height - 10);
  }
  
  // Draw y-axis ticks
  const yTicks = 5;
  const yStep = (yMax - yMin) / yTicks;
  for (let i = 0; i <= yTicks; i++) {
    const y = yMin + i * yStep;
    const yPos = transformY(y);
    
    ctx.beginPath();
    ctx.moveTo(transformX(xMin), yPos);
    ctx.lineTo(transformX(xMax), yPos);
    ctx.strokeStyle = '#eee';
    ctx.stroke();
    
    // Tick label
    ctx.fillStyle = '#888';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(y.toFixed(1), 20, yPos + 4);
  }
};

/**
 * Draws data points with appropriate styling based on algorithm
 */
const drawDataPoints = (
  ctx: CanvasRenderingContext2D,
  data: DataPoint[],
  transformX: (x: number) => number,
  transformY: (y: number) => number,
  algorithm: Algorithm
) => {
  // Set point style based on algorithm
  switch (algorithm) {
    case 'linearRegression':
      // Simple dots for regression
      ctx.fillStyle = '#3b82f6';
      for (const point of data) {
        ctx.beginPath();
        ctx.arc(transformX(point.x), transformY(point.y), 4, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
      
    case 'logisticRegression':
      // Color by class for classification
      for (const point of data) {
        ctx.fillStyle = point.label === 1 ? '#3b82f6' : '#f97316';
        ctx.beginPath();
        ctx.arc(transformX(point.x), transformY(point.y), 5, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
      
    case 'kMeansClustering':
      // If clusters are assigned, color by cluster
      if (data[0].cluster !== undefined) {
        const clusterColors = ['#3b82f6', '#f97316', '#8b5cf6', '#10b981', '#ef4444'];
        for (const point of data) {
          const colorIndex = point.cluster || 0;
          ctx.fillStyle = clusterColors[colorIndex % clusterColors.length];
          ctx.beginPath();
          ctx.arc(transformX(point.x), transformY(point.y), 4, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        // Otherwise, use a single color
        ctx.fillStyle = '#3b82f6';
        for (const point of data) {
          ctx.beginPath();
          ctx.arc(transformX(point.x), transformY(point.y), 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      break;
      
    case 'decisionTree':
      // Color by class for decision tree
      for (const point of data) {
        ctx.fillStyle = point.label === 1 ? '#3b82f6' : '#f97316';
        ctx.beginPath();
        ctx.arc(transformX(point.x), transformY(point.y), 4, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
      
    default:
      // Default styling
      ctx.fillStyle = '#3b82f6';
      for (const point of data) {
        ctx.beginPath();
        ctx.arc(transformX(point.x), transformY(point.y), 4, 0, Math.PI * 2);
        ctx.fill();
      }
  }
};

/**
 * Draws linear regression visualization
 */
const drawLinearRegression = (
  ctx: CanvasRenderingContext2D,
  data: DataPoint[],
  results: any,
  transformX: (x: number) => number,
  transformY: (y: number) => number,
  currentIteration: number,
  yMax: number
) => {
  // Find data x range
  const xValues = data.map(p => p.x);
  const xMin = Math.min(...xValues);
  const xMax = Math.max(...xValues);
  
  // Get current model parameters
  let slope, intercept;
  
  if (currentIteration > 0 && currentIteration < results.history.length) {
    // Use parameters from history for animation
    const historyEntry = results.history[currentIteration - 1];
    slope = historyEntry.slope;
    intercept = historyEntry.intercept;
  } else {
    // Use final parameters
    slope = results.slope;
    intercept = results.intercept;
  }
  
  // Draw the regression line
  ctx.beginPath();
  ctx.moveTo(transformX(xMin), transformY(slope * xMin + intercept));
  ctx.lineTo(transformX(xMax), transformY(slope * xMax + intercept));
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 2;
  ctx.stroke();
  
  // Draw the equation
  ctx.font = '14px sans-serif';
  ctx.fillStyle = '#ef4444';
  ctx.textAlign = 'left';
  ctx.fillText(
    i18n.t('viz_linear_regression_equation', { slope: slope.toFixed(3), intercept: intercept.toFixed(3) }),
    transformX(xMin) + 10,
    transformY(yMax) + 30
  );
};

/**
 * Draws logistic regression visualization
 */
const drawLogisticRegression = (
  ctx: CanvasRenderingContext2D,
  data: DataPoint[],
  results: any,
  transformX: (x: number) => number,
  transformY: (y: number) => number,
  currentIteration: number
) => {
  // Get data ranges
  const xValues = data.map(p => p.x);
  const yValues = data.map(p => p.y);
  const xMin = Math.min(...xValues);
  const xMax = Math.max(...xValues);
  const yMin = Math.min(...yValues);
  const yMax = Math.max(...yValues);
  
  // Get current model parameters
  let weights, bias;
  
  if (currentIteration > 0 && currentIteration < results.history.length) {
    // Use parameters from history for animation
    const historyEntry = results.history[currentIteration - 1];
    weights = historyEntry.weights;
    bias = historyEntry.bias;
  } else {
    // Use final parameters
    weights = results.weights;
    bias = results.bias;
  }
  
  // Draw decision boundary
  // For logistic regression, the boundary is where w0*x + w1*y + b = 0
  // So y = -(w0*x + b) / w1
  if (weights[1] !== 0) {
    const getY = (x: number) => -(weights[0] * x + bias) / weights[1];
    
    ctx.beginPath();
    ctx.moveTo(transformX(xMin), transformY(getY(xMin)));
    ctx.lineTo(transformX(xMax), transformY(getY(xMax)));
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw the equation
    ctx.font = '14px sans-serif';
    ctx.fillStyle = '#ef4444';
    ctx.textAlign = 'left';
    ctx.fillText(
      i18n.t('viz_logistic_regression_equation', { w0: weights[0].toFixed(3), w1: weights[1].toFixed(3), bias: bias.toFixed(3) }),
      transformX(xMin) + 10,
      transformY(yMin) - 10
    );
  }
  
  // Draw filled regions (probability contours)
  const step = (xMax - xMin) / 100;
  const gridSize = 50;
  const xStep = (xMax - xMin) / gridSize;
  const yStep = (yMax - yMin) / gridSize;
  
  // Sigmoid function
  const sigmoid = (z: number) => 1 / (1 + Math.exp(-z));
  
  // Draw probability contours
  for (let i = 0; i <= gridSize; i++) {
    for (let j = 0; j <= gridSize; j++) {
      const x = xMin + i * xStep;
      const y = yMin + j * yStep;
      
      // Calculate probability
      const z = weights[0] * x + weights[1] * y + bias;
      const probability = sigmoid(z);
      
      // Draw a small rectangle with opacity based on probability
      const alpha = Math.max(0.05, probability);
      ctx.fillStyle = probability >= 0.5 
        ? `rgba(59, 130, 246, ${alpha * 0.3})` 
        : `rgba(249, 115, 22, ${(1 - alpha) * 0.3})`;
      
      ctx.fillRect(
        transformX(x - xStep/2), 
        transformY(y + yStep/2),
        transformX(x + xStep/2) - transformX(x - xStep/2),
        transformY(y - yStep/2) - transformY(y + yStep/2)
      );
    }
  }
};

/**
 * Draws k-means clustering visualization
 */
const drawKMeansClustering = (
  ctx: CanvasRenderingContext2D,
  data: DataPoint[],
  results: any,
  transformX: (x: number) => number,
  transformY: (y: number) => number,
  currentIteration: number
) => {
  // Get centroids
  let centroids;
  let assignments;
  
  if (currentIteration > 0 && currentIteration < results.history.length) {
    // Use centroids from history for animation
    const historyEntry = results.history[currentIteration - 1];
    centroids = historyEntry.centroids;
    
    // Calculate assignments based on these centroids
    assignments = data.map(point => {
      let minDistance = Infinity;
      let closestCentroid = 0;
      
      for (let i = 0; i < centroids.length; i++) {
        const distance = Math.sqrt(
          Math.pow(point.x - centroids[i].x, 2) + 
          Math.pow(point.y - centroids[i].y, 2)
        );
        
        if (distance < minDistance) {
          minDistance = distance;
          closestCentroid = i;
        }
      }
      
      return closestCentroid;
    });
  } else {
    // Use final centroids and assignments
    centroids = results.centroids;
    assignments = results.assignments;
  }
  
  // Draw assignment regions
  const clusterColors = [
    'rgba(59, 130, 246, 0.2)',  // Blue
    'rgba(249, 115, 22, 0.2)',  // Orange
    'rgba(139, 92, 246, 0.2)',  // Purple
    'rgba(16, 185, 129, 0.2)',  // Green
    'rgba(239, 68, 68, 0.2)',   // Red
  ];
  
  // Find data ranges
  const xValues = data.map(p => p.x);
  const yValues = data.map(p => p.y);
  const xMin = Math.min(...xValues);
  const xMax = Math.max(...xValues);
  const yMin = Math.min(...yValues);
  const yMax = Math.max(...yValues);
  
  // Draw Voronoi-like regions
  const gridSize = 50;
  const xStep = (xMax - xMin) / gridSize;
  const yStep = (yMax - yMin) / gridSize;
  
  for (let i = 0; i <= gridSize; i++) {
    for (let j = 0; j <= gridSize; j++) {
      const x = xMin + i * xStep;
      const y = yMin + j * yStep;
      
      // Find closest centroid
      let minDistance = Infinity;
      let closestCentroid = 0;
      
      for (let k = 0; k < centroids.length; k++) {
        const distance = Math.sqrt(
          Math.pow(x - centroids[k].x, 2) + 
          Math.pow(y - centroids[k].y, 2)
        );
        
        if (distance < minDistance) {
          minDistance = distance;
          closestCentroid = k;
        }
      }
      
      // Draw a small rectangle with color based on closest centroid
      ctx.fillStyle = clusterColors[closestCentroid % clusterColors.length];
      
      ctx.fillRect(
        transformX(x - xStep/2), 
        transformY(y + yStep/2),
        transformX(x + xStep/2) - transformX(x - xStep/2),
        transformY(y - yStep/2) - transformY(y + yStep/2)
      );
    }
  }
  
  // Draw data points colored by assignment
  const pointColors = [
    '#3b82f6',  // Blue
    '#f97316',  // Orange
    '#8b5cf6',  // Purple
    '#10b981',  // Green
    '#ef4444',  // Red
  ];
  
  for (let i = 0; i < data.length; i++) {
    const point = data[i];
    const cluster = assignments[i];
    
    ctx.fillStyle = pointColors[cluster % pointColors.length];
    ctx.beginPath();
    ctx.arc(transformX(point.x), transformY(point.y), 4, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Draw centroids
  for (let i = 0; i < centroids.length; i++) {
    const centroid = centroids[i];
    
    ctx.fillStyle = pointColors[i % pointColors.length];
    ctx.beginPath();
    ctx.arc(transformX(centroid.x), transformY(centroid.y), 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw centroid label
    ctx.fillStyle = '#000';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(
      i18n.t('viz_kmeans_centroid_label', { index: i + 1 }),
      transformX(centroid.x),
      transformY(centroid.y) - 10 // Position above the centroid
    );
  }
};

/**
 * Draws decision tree visualization
 */
const drawDecisionTree = (
  ctx: CanvasRenderingContext2D,
  data: DataPoint[],
  results: any,
  transformX: (x: number) => number,
  transformY: (y: number) => number
) => {
  // Draw decision boundaries
  if (results.boundaries && results.boundaries.length > 0) {
    for (const boundary of results.boundaries) {
      // Color based on depth
      const depthFactor = Math.min(1, boundary.depth / 10);
      const hue = 220 * (1 - depthFactor) + 30 * depthFactor;
      ctx.strokeStyle = `hsl(${hue}, 80%, 50%)`;
      ctx.lineWidth = Math.max(1, 3 - boundary.depth * 0.3);
      
      ctx.beginPath();
      if (boundary.type === 'vertical') {
        ctx.moveTo(transformX(boundary.x), transformY(boundary.yMin));
        ctx.lineTo(transformX(boundary.x), transformY(boundary.yMax));
      } else {
        ctx.moveTo(transformX(boundary.xMin), transformY(boundary.y));
        ctx.lineTo(transformX(boundary.xMax), transformY(boundary.y));
      }
      ctx.stroke();
    }
  }
  
  // Draw colored regions
  if (results.predictions && results.predictions.length > 0) {
    // Find data ranges
    const xValues = data.map(p => p.x);
    const yValues = data.map(p => p.y);
    const xMin = Math.min(...xValues);
    const xMax = Math.max(...xValues);
    const yMin = Math.min(...yValues);
    const yMax = Math.max(...yValues);
    
    // Create a grid and color by predicted class
    const gridSize = 50;
    const xStep = (xMax - xMin) / gridSize;
    const yStep = (yMax - yMin) / gridSize;
    
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const x = xMin + (i + 0.5) * xStep;
        const y = yMin + (j + 0.5) * yStep;
        
        // Find the closest data point
        let minDistance = Infinity;
        let closestIndex = 0;
        
        for (let k = 0; k < data.length; k++) {
          const distance = Math.sqrt(
            Math.pow(x - data[k].x, 2) + 
            Math.pow(y - data[k].y, 2)
          );
          
          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = k;
          }
        }
        
        // Use the prediction for this point
        const prediction = results.predictions[closestIndex];
        
        ctx.fillStyle = prediction === 1 
          ? 'rgba(59, 130, 246, 0.2)' 
          : 'rgba(249, 115, 22, 0.2)';
        
        ctx.fillRect(
          transformX(x - xStep/2), 
          transformY(y + yStep/2),
          transformX(x + xStep/2) - transformX(x - xStep/2),
          transformY(y - yStep/2) - transformY(y + yStep/2)
        );
      }
    }
  }
  
  // Redraw data points on top
  for (const point of data) {
    ctx.fillStyle = point.label === 1 ? '#3b82f6' : '#f97316';
    ctx.beginPath();
    ctx.arc(transformX(point.x), transformY(point.y), 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;
    ctx.stroke();
  }
};