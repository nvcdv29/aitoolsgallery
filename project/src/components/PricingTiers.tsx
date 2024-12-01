import React from 'react';
import { Check } from 'lucide-react';
import type { PricingTier } from '../data/tools';

interface PricingTiersProps {
  tiers: PricingTier[];
}

export function PricingTiers({ tiers }: PricingTiersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      {tiers.map((tier) => (
        <div
          key={tier.name}
          className={`rounded-lg border ${
            tier.popular ? 'border-blue-600 shadow-lg' : 'border-gray-200'
          } p-6 relative`}
        >
          {tier.popular && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
              Most Popular
            </span>
          )}
          
          <h3 className="text-lg font-semibold mb-2">{tier.name}</h3>
          
          <div className="mb-4">
            <span className="text-3xl font-bold">{tier.price}</span>
            {tier.interval && (
              <span className="text-gray-500 ml-1">/{tier.interval}</span>
            )}
          </div>
          
          <p className="text-gray-600 mb-6">{tier.description}</p>
          
          <ul className="space-y-3 mb-6">
            {tier.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
          
          {tier.buttonUrl && (
            <a
              href={tier.buttonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`block text-center py-2 px-4 rounded-lg transition-colors ${
                tier.popular
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {tier.buttonText || 'Get Started'}
            </a>
          )}
        </div>
      ))}
    </div>
  );
}