import React from 'react';
import { X, ExternalLink, Link2, Check } from 'lucide-react';
import { PlatformIcons } from './PlatformIcons';
import { useTranslation } from 'react-i18next';
import type { AITool } from '../data/tools';

interface ToolModalProps {
  tool: AITool;
  onClose: () => void;
}

export function ToolModal({ tool, onClose }: ToolModalProps) {
  const [copied, setCopied] = React.useState(false);
  const { t } = useTranslation();
  
  const copyLink = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('tool', tool.id);
    navigator.clipboard.writeText(url.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 px-6 py-4 flex justify-between items-center z-10">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{tool.name}</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={copyLink}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              title="Copy link"
            >
              {copied ? (
                <Check className="h-5 w-5 text-green-500" />
              ) : (
                <Link2 className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <img
              src={tool.imageUrl}
              alt={tool.name}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">{tool.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  {t('modal.features')}
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  {tool.features.map((feature) => (
                    <li key={feature} className="text-gray-600 dark:text-gray-300">{feature}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  {t('modal.details')}
                </h3>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-gray-500 dark:text-gray-400">{t('modal.category')}</dt>
                    <dd className="font-medium text-gray-900 dark:text-white">{tool.category}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500 dark:text-gray-400">{t('modal.platforms')}</dt>
                    <dd className="flex gap-3 mt-1">
                      <PlatformIcons platforms={tool.platforms} className="h-5 w-5" />
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500 dark:text-gray-400">{t('modal.company')}</dt>
                    <dd className="font-medium">
                      <a
                        href={tool.company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 inline-flex items-center gap-1"
                      >
                        {tool.company.name}
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              {t('modal.pricing')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {tool.pricingTiers.map((tier) => (
                <div
                  key={tier.name}
                  className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4"
                >
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                    {tier.name}
                  </h4>
                  <div className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {tier.price}
                    {tier.interval && (
                      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        /{tier.interval}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    {tier.description}
                  </p>
                  {tier.buttonUrl && (
                    <a
                      href={tier.buttonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      {t('pricing.moreInfo')}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {tool.platformLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition-colors"
              >
                <PlatformIcons platforms={[link.platform]} />
                <span>{link.platform}</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}