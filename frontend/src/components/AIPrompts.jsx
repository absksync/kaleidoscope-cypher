import React, { useEffect, useState } from 'react';
import { Sparkles, RefreshCw, Lightbulb } from 'lucide-react';
import useStore from '../store';

const AIPrompts = () => {
  const aiPrompts = useStore((state) => state.aiPrompts);
  const updateAIPrompts = useStore((state) => state.updateAIPrompts);
  const [loading, setLoading] = useState(false);

  const fetchPrompts = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/prompts');
      if (response.ok) {
        const data = await response.json();
        updateAIPrompts(data.prompts || []);
      }
    } catch (error) {
      console.error('Error fetching AI prompts:', error);
      // Fallback prompts if backend is not available
      updateAIPrompts([
        "What if we combined two existing features in an unexpected way?",
        "How would a child solve this problem?",
        "What's the opposite of our current approach?",
        "How can we make this 10x better, not just 10% better?",
        "What would this look like in a different industry?",
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrompts();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Sparkles className="text-primary-500" />
          AI Creative Prompts
        </h2>
        <button
          onClick={fetchPrompts}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition disabled:opacity-50"
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      <p className="text-gray-600 mb-4">
        Get inspired with AI-generated creative prompts to help you think differently!
      </p>

      <div className="space-y-3">
        {aiPrompts.length === 0 && !loading ? (
          <p className="text-gray-500 text-center py-8">Click refresh to generate prompts</p>
        ) : (
          aiPrompts.map((prompt, index) => (
            <div
              key={index}
              className="p-4 bg-gradient-to-r from-primary-50 to-purple-50 rounded-lg border border-primary-200 hover:shadow-md transition"
            >
              <div className="flex items-start gap-3">
                <Lightbulb className="text-primary-500 flex-shrink-0 mt-1" size={20} />
                <p className="text-gray-800 font-medium">{prompt}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
        </div>
      )}

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-gray-700">
          💡 <strong>Tip:</strong> Use these prompts as starting points for brainstorming. 
          They're designed to help you think outside the box and explore new perspectives!
        </p>
      </div>
    </div>
  );
};

export default AIPrompts;
