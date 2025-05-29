import React from 'react';
import { Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner py-6 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {t('footer_copyright', { year: currentYear })}
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm mr-2">
              {t('footer_made_with')}
            </p>
            <Heart className="h-4 w-4 text-red-500 animate-pulse" />
            <p className="text-gray-600 dark:text-gray-400 text-sm ml-2">
              {t('footer_for_enthusiasts')}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm">{t('footer_privacy')}</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm">{t('footer_terms')}</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm">{t('footer_contact')}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;