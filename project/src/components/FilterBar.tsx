import React from 'react';
import { Filter } from 'lucide-react';
import { FilterSection } from './FilterSection';
import { useTranslation } from 'react-i18next';

interface FilterBarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  pricingTypes: string[];
  selectedPricing: string;
  onPricingChange: (pricing: string) => void;
  platforms: string[];
  selectedPlatforms: string[];
  onPlatformsChange: (platform: string) => void;
  aiTypes: string[];
  selectedAiType: string;
  onAiTypeChange: (type: string) => void;
}

export function FilterBar({
  categories,
  selectedCategory,
  onCategoryChange,
  pricingTypes,
  selectedPricing,
  onPricingChange,
  platforms,
  selectedPlatforms,
  onPlatformsChange,
  aiTypes,
  selectedAiType,
  onAiTypeChange,
}: FilterBarProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { t } = useTranslation();

  return (
    <div className="relative mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700"
      >
        <Filter className="h-5 w-5" />
        <span>{t('filters.title')}</span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="p-4">
            <FilterSection
              title={t('filters.aiType.title')}
              options={aiTypes}
              selected={selectedAiType ? [selectedAiType] : []}
              onChange={onAiTypeChange}
              multiSelect={false}
            />
            
            <FilterSection
              title={t('filters.categories')}
              options={categories}
              selected={selectedCategory ? [selectedCategory] : []}
              onChange={onCategoryChange}
              multiSelect={false}
            />
            
            <FilterSection
              title={t('filters.pricing')}
              options={pricingTypes}
              selected={selectedPricing ? [selectedPricing] : []}
              onChange={onPricingChange}
              multiSelect={false}
            />
            
            <FilterSection
              title={t('filters.platforms')}
              options={platforms}
              selected={selectedPlatforms}
              onChange={onPlatformsChange}
              multiSelect={true}
              type="platform"
            />
          </div>
        </div>
      )}
    </div>
  );
}