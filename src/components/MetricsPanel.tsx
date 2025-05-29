import React from 'react';
import { BarChart2, TrendingUp, Percent } from 'lucide-react';
import { Algorithm } from '../types';
import { useTranslation } from 'react-i18next';

interface MetricsPanelProps {
  algorithm: Algorithm;
  results: any;
}

const MetricsPanel: React.FC<MetricsPanelProps> = ({ algorithm, results }) => {
  const { t } = useTranslation();

  const getMetrics = () => {
    switch (algorithm) {
      case 'linearRegression':
        return [
          { name: t('metric_name_mse'), value: results.mse.toFixed(4), icon: <BarChart2 className="h-4 w-4" /> },
          { name: t('metric_name_r2'), value: results.r2.toFixed(4), icon: <Percent className="h-4 w-4" /> },
          { name: t('metric_name_slope'), value: results.slope.toFixed(4), icon: <TrendingUp className="h-4 w-4" /> },
          { name: t('metric_name_intercept'), value: results.intercept.toFixed(4), icon: <TrendingUp className="h-4 w-4\" rotate={90} /> },
        ];
      case 'logisticRegression':
        return [
          { name: t('metric_name_accuracy'), value: (results.accuracy * 100).toFixed(2) + '%', icon: <Percent className="h-4 w-4" /> },
          { name: t('metric_name_precision'), value: (results.precision * 100).toFixed(2) + '%', icon: <Percent className="h-4 w-4" /> },
          { name: t('metric_name_recall'), value: (results.recall * 100).toFixed(2) + '%', icon: <Percent className="h-4 w-4" /> },
          { name: t('metric_name_f1_score'), value: results.f1.toFixed(4), icon: <BarChart2 className="h-4 w-4" /> },
        ];
      case 'kMeansClustering':
        return [
          { name: t('metric_name_inertia'), value: results.inertia.toFixed(4), icon: <BarChart2 className="h-4 w-4" /> },
          { name: t('metric_name_silhouette_score'), value: results.silhouette.toFixed(4), icon: <BarChart2 className="h-4 w-4" /> },
          { name: t('metric_name_iterations'), value: results.iterations, icon: <TrendingUp className="h-4 w-4" /> },
          { name: t('metric_name_clusters'), value: results.clusters, icon: <TrendingUp className="h-4 w-4" /> },
        ];
      case 'decisionTree':
        return [
          { name: t('metric_name_accuracy'), value: (results.accuracy * 100).toFixed(2) + '%', icon: <Percent className="h-4 w-4" /> },
          { name: t('metric_name_depth'), value: results.depth, icon: <TrendingUp className="h-4 w-4" /> },
          { name: t('metric_name_nodes'), value: results.nodes, icon: <BarChart2 className="h-4 w-4" /> },
          { name: t('metric_name_gini_impurity'), value: results.gini.toFixed(4), icon: <BarChart2 className="h-4 w-4" /> },
        ];
      default:
        return [];
    }
  };

  const metrics = getMetrics();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('metrics_panel_title')}</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg transition-colors duration-200">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-blue-600 dark:text-blue-400">{metric.icon}</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{metric.name}</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {metric.value}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg transition-colors duration-200">
        <h3 className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-2">{t('interpretation_title')}</h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {getInterpretation(algorithm, results, t)}
        </p>
      </div>
    </div>
  );
};

const getInterpretation = (algorithm: Algorithm, results: any, t: any) => {
  switch (algorithm) {
    case 'linearRegression':
      return t('interpretation_linear_regression', {
              r2_percentage: (results.r2 * 100).toFixed(2),
              mse: results.mse.toFixed(4)
             });
    case 'logisticRegression':
      return t('interpretation_logistic_regression', {
              accuracy_percentage: (results.accuracy * 100).toFixed(2),
              precision_percentage: (results.precision * 100).toFixed(2),
              recall_percentage: (results.recall * 100).toFixed(2)
             });
    case 'kMeansClustering':
      return t('interpretation_kmeans_clustering', {
              iterations: results.iterations,
              inertia: results.inertia.toFixed(4),
              silhouette: results.silhouette.toFixed(4)
             });
    case 'decisionTree':
      return t('interpretation_decision_tree', {
              depth: results.depth,
              nodes: results.nodes,
              accuracy_percentage: (results.accuracy * 100).toFixed(2),
              gini: results.gini.toFixed(4)
             });
    default:
      return t('interpretation_default');
  }
};

export default MetricsPanel;