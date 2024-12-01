import React from 'react';
import { ExternalLink } from 'lucide-react';
import { PlatformIcons } from './PlatformIcons';
import { useTranslation } from 'react-i18next';
import type { AITool } from '../data/tools';

interface ToolCardProps {
  tool: AITool;
  onClick: () => void;
}

export function ToolCard({ tool, onClick }: ToolCardProps) {
  const { t } = useTranslation();

  return (
    <div
      onClick={onClick}
      className={`
        bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer overflow-hidden
        ${tool.featured ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''}
      `}
    >
      <div className={`relative ${tool.featured ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}>
        <img
          src={tool.imageUrl}
          alt={tool.name}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{tool.name}</h3>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
            {tool.category}
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{tool.shortDescription}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {tool.pricing.type === 'free' ? t('pricing.free') :
               tool.pricing.type === 'freemium' ? t('pricing.freemium') :
               `${t('pricing.from')} ${tool.pricing.startingPrice}`}
            </div>
            <PlatformIcons platforms={tool.platforms} />
          </div>
          <a
            href={tool.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 inline-flex items-center gap-1"
          >
            <span className="text-sm">{t('pricing.moreInfo')}</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}