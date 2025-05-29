import React from 'react';
import { useTranslation } from 'react-i18next';
import { LineChart, Target, ScatterChart, GitCommit } from 'lucide-react';

const AlgorithmsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{t('navbar_algorithms')}</h1>
      
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-10">
        {t('algorithms_intro_part1')}
        {t('algorithms_intro_part2')}
      </p>

      {/* Supervised Learning Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 transition-colors duration-200">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t('supervised_learning_title')}</h2>
        <p className="text-gray-700 dark:text-gray-300">{t('supervised_learning_description')}</p>
      </div>

      {/* Unsupervised Learning Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 transition-colors duration-200">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t('unsupervised_learning_title')}</h2>
        <p className="text-gray-700 dark:text-gray-300">{t('unsupervised_learning_description')}</p>
      </div>

      <div className="space-y-12 mt-10">
        {/* Linear Regression */}
        <div id="linear-regression">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
            <div className="flex items-center mb-4">
              <LineChart className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{t('algorithm_linear_regression')}</h2>
              <span className="ml-4 text-sm font-medium text-blue-800 bg-blue-100 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{t('learning_type_supervised')}</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 italic mb-4">
              {t('algorithm_linear_regression_description')}
            </p>
            <div className="ml-4 space-y-4">
              <div id="linear-regression-concepts">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">{t('concepts_title')}</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li>{t('algorithm_concept_dependent_variable')}</li>
                  <li>{t('algorithm_concept_independent_variable')}</li>
                  <li>{t('algorithm_concept_model_parameters')}</li>
                  <li>{t('algorithm_concept_cost_function')}</li>
                  <li>{t('algorithm_concept_gradient_descent')}</li>
                </ul>
              </div>
              <div id="linear-regression-principle">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">{t('principle_title')}</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {t('algorithm_linear_regression_principle')}
                </p>
                {/* TODO: Add a visual illustration of Linear Regression. e.g., Scatter plot with a best-fit line */}
              </div>
              <div id="linear-regression-usecases">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">{t('usecases_title')}</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li>{t('algorithm_usecase_house_price')}</li>
                  <li>{t('algorithm_usecase_stock_price')}</li>
                  <li>{t('algorithm_usecase_sales_prediction')}</li>
                  <li>{t('algorithm_usecase_performance_analysis')}</li>
                </ul>
              </div>
              <div id="linear-regression-examples">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">{t('examples_title')}</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {t('algorithm_linear_regression_example')}
                </p>
                <img src="/images/linear_regression.png" alt="Ev Fiyatı Tahmini Örneği Görselleştirmesi" className="my-4 rounded-md shadow w-2/3 mx-auto" />
              </div>
              <div id="linear-regression-procons">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">{t('procons_title')}</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li>{t('algorithm_linear_regression_pro')}</li>
                  <li>{t('algorithm_linear_regression_con')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Logistic Regression */}
        <div id="logistic-regression">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
            <div className="flex items-center mb-4">
              <Target className="h-6 w-6 text-green-600 dark:text-green-400 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{t('algorithm_logistic_regression')}</h2>
              <span className="ml-4 text-sm font-medium text-green-800 bg-green-100 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">{t('learning_type_supervised')}</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 italic mb-4">
              {t('algorithm_logistic_regression_description')}
            </p>
            <div className="ml-4 space-y-4">
              <div id="logistic-regression-concepts">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">{t('concepts_title')}</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li>{t('algorithm_concept_sigmoid_function')}</li>
                  <li>{t('algorithm_concept_decision_boundary')}</li>
                  <li>{t('algorithm_concept_probability_estimation')}</li>
                  <li>{t('algorithm_concept_cross_entropy_loss')}</li>
                </ul>
              </div>
              <div id="logistic-regression-principle">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">{t('principle_title')}</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {t('algorithm_logistic_regression_principle')}
                </p>
                {/* TODO: Add a visual illustration of Logistic Regression. e.g., Scatter plot with a decision boundary line/curve */}
                <img src="/images/logistic_regression.png" alt="Lojistik Regresyon görselleştirmesi" className="my-4 rounded-md shadow w-2/3 mx-auto" />
              </div>
              <div id="logistic-regression-usecases">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">{t('usecases_title')}</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li>{t('algorithm_usecase_spam_detection')}</li>
                  <li>{t('algorithm_usecase_disease_diagnosis')}</li>
                  <li>{t('algorithm_usecase_credit_risk')}</li>
                  <li>{t('algorithm_usecase_customer_churn')}</li>
                </ul>
              </div>
              <div id="logistic-regression-procons">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">{t('procons_title')}</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li>{t('algorithm_logistic_regression_pro')}</li>
                  <li>{t('algorithm_logistic_regression_con')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* K-Means Clustering */}
        <div id="kmeans-clustering">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
            <div className="flex items-center mb-4">
              <ScatterChart className="h-6 w-6 text-purple-600 dark:text-purple-400 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{t('algorithm_kmeans_clustering')}</h2>
              <span className="ml-4 text-sm font-medium text-purple-800 bg-purple-100 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">{t('learning_type_unsupervised')}</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 italic mb-4">
              {t('algorithm_kmeans_clustering_description')}
            </p>
            <div className="ml-4 space-y-4">
              <div id="kmeans-clustering-concepts">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">{t('concepts_title')}</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li>{t('algorithm_concept_k_value')}</li>
                  <li>{t('algorithm_concept_centroid')}</li>
                  <li>{t('algorithm_concept_assignment_step')}</li>
                  <li>{t('algorithm_concept_update_step')}</li>
                  <li>{t('algorithm_concept_inertia')}</li>
                </ul>
                <li>K: Oluşturulacak küme sayısı (algoritma çalıştırılmadan önce belirlenmelidir).</li>
                <li>Centroid (Küme Merkezi): Her kümenin merkezini temsil eden nokta.</li>
                <li>Atama Adımı (Assignment Step): Her veri noktasının en yakın centroid'e atandığı adım.</li>
                <li>Güncelleme Adımı (Update Step): Her centroid'in atandığı noktaların ortalamasına göre yeniden hesaplandığı adım.</li>
                <li>Inertia: Küme içi toplam kareler mesafesi (centroid'e olan uzaklıkların karelerinin toplamı).</li>
                </ul>
              </div>
              <div id="kmeans-clustering-principle">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">{t('principle_title')}</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {t('algorithm_kmeans_clustering_principle_intro')}
                  <ol className="list-decimal list-inside ml-4">
                    <li>{t('algorithm_kmeans_clustering_principle_step1')}</li>
                    <li>{t('algorithm_kmeans_clustering_principle_step2')}</li>
                    <li>{t('algorithm_kmeans_clustering_principle_step3')}</li>
                    <li>{t('algorithm_kmeans_clustering_principle_step4')}</li>
                  </ol>
                  {t('algorithm_kmeans_clustering_principle_outro')}
                </p>
                {/* TODO: Add a visual illustration of K-Means Clustering. e.g., Scatter plot with data points colored by cluster and centroids */}
                <img src="/images/kmeans.png" alt="K-Ortalama Kümeleme görselleştirmesi" className="my-4 rounded-md shadow w-2/3 mx-auto" />
              </div>
              <div id="kmeans-clustering-usecases">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">{t('usecases_title')}</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li>{t('algorithm_usecase_customer_segmentation')}</li>
                  <li>{t('algorithm_usecase_image_compression')}</li>
                  <li>{t('algorithm_usecase_anomaly_detection')}</li>
                  <li>{t('algorithm_usecase_document_analysis')}</li>
                </ul>
              </div>
              <div id="kmeans-clustering-procons">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">{t('procons_title')}</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li>{t('algorithm_kmeans_clustering_pro')}</li>
                  <li>{t('algorithm_kmeans_clustering_con')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decision Tree */}
        <div id="decision-tree">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
            <div className="flex items-center mb-4">
              <GitCommit className="h-6 w-6 text-orange-600 dark:text-orange-400 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{t('algorithm_decision_tree')}</h2>
              <span className="ml-4 text-sm font-medium text-orange-800 bg-orange-100 px-2.5 py-0.5 rounded dark:bg-orange-900 dark:text-orange-300">{t('learning_type_supervised')}</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 italic mb-4">
              Karar Ağacı, veriyi özelliklere göre dallara ayırarak kararlar alan çok yönlü bir denetimli öğrenme algoritmasıdır. Hem sınıflandırma hem de regresyon görevleri için kullanılabilir ve ağaç benzeri bir yapı oluşturur.
            </p>
            <div className="ml-4 space-y-4">
              <div id="decision-tree-concepts">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">{t('concepts_title')}</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li>{t('algorithm_concept_root_node')}</li>
                  <li>{t('algorithm_concept_decision_node')}</li>
                  <li>{t('algorithm_concept_leaf_node')}</li>
                  <li>{t('algorithm_concept_splitting')}</li>
                  <li>{t('algorithm_concept_pruning')}</li>
                  <li>{t('algorithm_concept_information_gain')}</li>
                  <li>{t('algorithm_concept_gini_impurity')}</li>
                </ul>
              </div>
              <div id="decision-tree-principle">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">{t('principle_title')}</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Karar ağacı algoritması, veri setini en iyi bölmeyi bularak özyinelemeli olarak alt kümelere ayırır. En iyi bölme, genellikle bilgi kazancını maksimize eden veya Gini safsızlığını minimize eden özellik ve eşik değerine göre belirlenir. Bu bölme işlemi, her alt küme saf hale gelene (tek bir sınıfa ait olana) veya başka bir durdurma kriteri (örn: maksimum derinlik, minimum örnek sayısı) karşılanana kadar devam eder. Sonuç, bir karar ağacı yapısıdır.
                </p>
                {/* TODO: Add a visual illustration of a Decision Tree structure or its decision boundaries. */}
                <img src="/images/decisiontree.png" alt="Karar Ağacı görselleştirmesi" className="my-4 rounded-md shadow w-2/3 mx-auto" />
              </div>
              <div id="decision-tree-usecases">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">{t('usecases_title')}</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li>{t('algorithm_usecase_customer_behavior')}</li>
                  <li>{t('algorithm_usecase_medical_diagnosis')}</li>
                  <li>{t('algorithm_usecase_fraud_detection')}</li>
                  <li>{t('algorithm_usecase_recommendation_system')}</li>
                </ul>
              </div>
              <div id="decision-tree-procons">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">{t('procons_title')}</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li>{t('algorithm_decision_tree_pro')}</li>
                  <li>{t('algorithm_decision_tree_con')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmsPage; 