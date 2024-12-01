import React, { useState, useMemo, useEffect } from 'react';
import { aiTools } from './data/tools';
import { SearchBar } from './components/SearchBar';
import { FilterBar } from './components/FilterBar';
import { ToolCard } from './components/ToolCard';
import { ToolModal } from './components/ToolModal';
import { FeaturedTools } from './components/FeaturedTools';
import { Bot } from 'lucide-react';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPricing, setSelectedPricing] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  // Handle deep linking
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const toolId = params.get('tool');
    if (toolId) {
      setSelectedTool(toolId);
    }
  }, []);

  // Update URL when tool is selected
  useEffect(() => {
    const url = new URL(window.location.href);
    if (selectedTool) {
      url.searchParams.set('tool', selectedTool);
    } else {
      url.searchParams.delete('tool');
    }
    window.history.pushState({}, '', url);
  }, [selectedTool]);

  const categories = useMemo(() => 
    [...new Set(aiTools.map(tool => tool.category))],
    []
  );

  const pricingTypes = useMemo(() => 
    [...new Set(aiTools.map(tool => tool.pricing.type))],
    []
  );

  const platforms = useMemo(() => 
    [...new Set(aiTools.flatMap(tool => tool.platforms))],
    []
  );

  const filteredTools = useMemo(() => {
    return aiTools.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || tool.category === selectedCategory;
      const matchesPricing = !selectedPricing || tool.pricing.type === selectedPricing;
      const matchesPlatforms = selectedPlatforms.length === 0 || 
                              selectedPlatforms.every(platform => tool.platforms.includes(platform));
      
      return matchesSearch && matchesCategory && matchesPricing && matchesPlatforms;
    });
  }, [searchQuery, selectedCategory, selectedPricing, selectedPlatforms]);

  const handlePlatformToggle = (platform: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <Bot className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">AI Tools Gallery</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FeaturedTools
          tools={aiTools}
          onToolClick={setSelectedTool}
        />

        <div className="mb-8">
          <div className="mb-4">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
            />
          </div>
          <FilterBar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            pricingTypes={pricingTypes}
            selectedPricing={selectedPricing}
            onPricingChange={setSelectedPricing}
            platforms={platforms}
            selectedPlatforms={selectedPlatforms}
            onPlatformsChange={handlePlatformToggle}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTools.map(tool => (
            <ToolCard
              key={tool.id}
              tool={tool}
              onClick={() => setSelectedTool(tool.id)}
            />
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No AI tools found matching your criteria.</p>
          </div>
        )}

        {selectedTool && (
          <ToolModal
            tool={aiTools.find(t => t.id === selectedTool)!}
            onClose={() => setSelectedTool(null)}
          />
        )}
      </main>
    </div>
  );
}

export default App;