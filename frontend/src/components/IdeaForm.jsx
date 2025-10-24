import React, { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';
import useStore from '../store';

const IdeaForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const addIdea = useStore((state) => state.addIdea);
  const awardPoints = useStore((state) => state.awardPoints);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !category) return;

    const idea = {
      title,
      description,
      category,
    };

    addIdea(idea);
    awardPoints(10); // Award points for submitting an idea
    
    // Send to backend
    try {
      await fetch('http://localhost:5000/api/ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(idea),
      });
    } catch (error) {
      console.error('Error submitting idea:', error);
    }

    // Reset form
    setTitle('');
    setDescription('');
    setCategory('');
  };

  const categories = [
    'Technology',
    'Marketing',
    'Product',
    'Operations',
    'Customer Experience',
    'Innovation',
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Sparkles className="text-primary-500" />
        Submit Your Idea
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Enter your idea title..."
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          >
            <option value="">Select a category...</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Describe your idea in detail..."
            rows="4"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600 transition flex items-center justify-center gap-2"
        >
          <Send size={20} />
          Submit Idea
        </button>
      </form>
    </div>
  );
};

export default IdeaForm;
