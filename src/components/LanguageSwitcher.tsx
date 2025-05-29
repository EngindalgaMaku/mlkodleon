import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          i18n.language === 'en'
            ? 'bg-blue-600 text-white dark:bg-blue-500'
            : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
        }`}
        onClick={() => changeLanguage('en')}
      >
        EN
      </button>
      <button
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          i18n.language === 'tr'
            ? 'bg-blue-600 text-white dark:bg-blue-500'
            : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
        }`}
        onClick={() => changeLanguage('tr')}
      >
        TR
      </button>
    </div>
  );
};

export default LanguageSwitcher; 