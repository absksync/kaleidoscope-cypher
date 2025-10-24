import React, { useState } from 'react';
import { Brain, Menu, X } from 'lucide-react';
import IdeaForm from './components/IdeaForm';
import DiversityAnalytics from './components/DiversityAnalytics';
import MindMapVisualization from './components/MindMapVisualization';
import Leaderboard from './components/Leaderboard';
import AIPrompts from './components/AIPrompts';
import Badges from './components/Badges';
import useStore from './store';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentUser = useStore((state) => state.currentUser);
  const ideas = useStore((state) => state.ideas);

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: '📊' },
    { id: 'submit', name: 'Submit Idea', icon: '💡' },
    { id: 'mindmap', name: 'Mind Map', icon: '🗺️' },
    { id: 'prompts', name: 'AI Prompts', icon: '✨' },
    { id: 'badges', name: 'Badges', icon: '🏆' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Brain className="text-primary-500" size={32} />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Kaleidoscope Cypher</h1>
                <p className="text-sm text-gray-600">Unlock Diversity of Thought</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Welcome, {currentUser.name}</p>
                <p className="text-lg font-bold text-primary-600">{currentUser.points} points</p>
              </div>
            </div>

            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Navigation */}
          <nav className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block mt-4`}>
            <div className="flex flex-col md:flex-row gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    activeTab === tab.id
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <DiversityAnalytics />
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Recent Ideas</h2>
                {ideas.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    No ideas yet. Be the first to submit one!
                  </p>
                ) : (
                  <div className="space-y-3">
                    {ideas.slice(-5).reverse().map((idea) => (
                      <div key={idea.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg text-gray-900">{idea.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{idea.description}</p>
                            <div className="flex items-center gap-3 mt-2">
                              <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">
                                {idea.category}
                              </span>
                              <span className="text-xs text-gray-500">by {idea.userName}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-6">
              <Leaderboard />
            </div>
          </div>
        )}

        {activeTab === 'submit' && (
          <div className="max-w-2xl mx-auto">
            <IdeaForm />
          </div>
        )}

        {activeTab === 'mindmap' && (
          <div>
            <MindMapVisualization />
          </div>
        )}

        {activeTab === 'prompts' && (
          <div className="max-w-3xl mx-auto">
            <AIPrompts />
          </div>
        )}

        {activeTab === 'badges' && (
          <div className="max-w-4xl mx-auto">
            <Badges />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-600">
            <p className="text-sm">
              Kaleidoscope Cypher - Fostering innovation through diversity of thought
            </p>
            <p className="text-xs mt-2">
              Powered by React, Tailwind CSS, Zustand, Flask, SentenceTransformers, and OpenAI
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
