import React from 'react';
import { ExternalLink } from 'lucide-react';
import { PlatformIcons } from './PlatformIcons';
import { useTranslation } from 'react-i18next';
import type { AITool } from '../data/tools';

interface FeaturedToolsProps {
  tools: AITool[];
  onToolClick: (id: string) => void;
}

export function FeaturedTools({ tools, onToolClick }: FeaturedToolsProps) {
  const featuredTools = tools.filter(tool => tool.featured);
  const { t } = useTranslation();

  if (featuredTools.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Featured Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredTools.map((tool) => (
            <div
              key={tool.id}
              onClick={() => onToolClick(tool.id)}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer p-4"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 flex-shrink-0">
                  <img
                    src={tool.logoUrl}
                    alt={`${tool.name} logo`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{tool.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{tool.shortDescription}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToolClick(tool.id);
                  }}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium"
                >
                  {t('pricing.moreInfo')}
                </button>
                <a
                  href={tool.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 text-sm px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  {t('pricing.moreInfo')}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}