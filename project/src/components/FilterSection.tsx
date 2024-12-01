import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { PlatformIcons } from './PlatformIcons';
import { useTranslation } from 'react-i18next';

interface FilterSectionProps {
  title: string;
  options: string[];
  selected: string[];
  onChange: (value: string) => void;
  multiSelect: boolean;
  type?: 'platform' | 'default';
}

export function FilterSection({
  title,
  options,
  selected,
  onChange,
  multiSelect,
  type = 'default'
}: FilterSectionProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { t } = useTranslation();

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 py-4 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left"
      >
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{title}</span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        )}
      </button>
      
      {isOpen && (
        <div className="mt-3 space-y-2">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => onChange(option)}
              className={`
                w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors
                ${selected.includes(option)
                  ? 'bg-blue-600 text-white dark:bg-blue-500'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}
              `}
            >
              {type === 'platform' && <PlatformIcons platforms={[option]} />}
              <span>{option}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}