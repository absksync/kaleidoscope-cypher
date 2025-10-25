import { useState } from 'react';
import EnhancedApiService from '../services/enhancedApi';

const SWOTAnalyzer = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [ideaText, setIdeaText] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState('');

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleAnalyze = async () => {
    if (!ideaText.trim()) {
      setError('Please enter an idea first');
      return;
    }

    setLoading(true);
    setError('');
    setAnalysis(null);

    try {
      const result = await EnhancedApiService.analyzeSWOT(ideaText);
      setAnalysis(result);
    } catch (err) {
      setError(err.message || 'Failed to analyze SWOT. Make sure the AI backend is running on port 8001.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" onMouseMove={handleMouseMove}>
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-black"></div>
      
      {/* Main Grid Lines - Subtle */}
      <div className="absolute inset-0 z-0" style={{
        backgroundImage: `
          linear-gradient(to right, rgba(59, 130, 246, 0.12) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(59, 130, 246, 0.12) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px'
      }}></div>
      
      {/* Diagonal Grid Pattern */}
      <div className="absolute inset-0 z-0" style={{
        backgroundImage: `
          linear-gradient(45deg, rgba(96, 165, 250, 0.08) 1px, transparent 1px),
          linear-gradient(-45deg, rgba(96, 165, 250, 0.08) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px'
      }}></div>
      
      {/* Mouse Following Light Effect */}
      <div 
        className="absolute z-0 pointer-events-none"
        style={{
          left: mousePosition.x - 250,
          top: mousePosition.y - 250,
          width: '500px',
          height: '500px',
          background: `radial-gradient(circle, rgba(59, 130, 246, 0.18) 0%, rgba(96, 165, 250, 0.11) 20%, transparent 65%)`,
          filter: 'blur(45px)',
          transform: 'translate3d(0, 0, 0)',
          willChange: 'transform',
        }}
      ></div>
      
      {/* Kaleidoscope Radial Pattern - More Subtle */}
      <div className="absolute inset-0 opacity-15 z-0" style={{
        backgroundImage: `
          repeating-conic-gradient(
            from 0deg at 50% 50%,
            rgba(59, 130, 246, 0.15) 0deg,
            transparent 8deg,
            rgba(96, 165, 250, 0.12) 16deg,
            transparent 24deg,
            rgba(147, 197, 253, 0.1) 32deg,
            transparent 40deg,
            rgba(59, 130, 246, 0.15) 48deg
          )
        `,
        backgroundSize: '600px 600px',
        backgroundPosition: 'center center'
      }}></div>
      
      {/* Content Container */}
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <div className="container mx-auto px-6 pt-20 pb-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              📊 SWOT Analysis Engine
            </h1>
            <p className="text-gray-400 text-lg">
              Strategic analysis of your ideas using the SWOT framework
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Evaluate Strengths, Weaknesses, Opportunities, and Threats
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Input Section */}
            <div className="mb-8 bg-black/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6">
              <h3 className="text-white text-lg font-semibold mb-4">Your Idea</h3>
              <textarea 
                className="w-full bg-black/50 border border-blue-500/30 rounded-xl p-4 text-white text-base resize-none focus:outline-none focus:border-blue-500 transition-colors h-32 mb-4"
                placeholder="Describe your idea here... (e.g., 'A mobile app that connects freelance designers with small businesses')"
                value={ideaText}
                onChange={(e) => setIdeaText(e.target.value)}
              ></textarea>
              
              {error && (
                <div className="mb-4 bg-red-500/20 border border-red-500/50 rounded-xl p-3 text-red-300 text-sm">
                  {error}
                </div>
              )}

              <button 
                onClick={handleAnalyze}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold text-base transition-all duration-300 border border-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Analyzing...' : '📊 Analyze SWOT'}
              </button>
            </div>

            {/* SWOT Analysis Results */}
            {analysis && (
              <div className="space-y-6">
                {/* Header with Idea */}
                <div className="bg-black/80 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6">
                  <h3 className="text-purple-400 text-sm font-semibold mb-2">ANALYZING:</h3>
                  <p className="text-white text-base">{analysis.idea_text}</p>
                </div>

                {/* SWOT Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Strengths */}
                  <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl border border-green-500/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-green-500/20 text-green-400 rounded-lg w-10 h-10 flex items-center justify-center text-xl">
                        💪
                      </div>
                      <h3 className="text-green-400 text-xl font-bold">Strengths</h3>
                    </div>
                    <ul className="space-y-2">
                      {analysis.swot.strengths.map((strength, index) => (
                        <li key={index} className="text-white text-sm flex items-start gap-2">
                          <span className="text-green-400 mt-1">•</span>
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Weaknesses */}
                  <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-xl border border-yellow-500/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-yellow-500/20 text-yellow-400 rounded-lg w-10 h-10 flex items-center justify-center text-xl">
                        ⚠️
                      </div>
                      <h3 className="text-yellow-400 text-xl font-bold">Weaknesses</h3>
                    </div>
                    <ul className="space-y-2">
                      {analysis.swot.weaknesses.map((weakness, index) => (
                        <li key={index} className="text-white text-sm flex items-start gap-2">
                          <span className="text-yellow-400 mt-1">•</span>
                          <span>{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Opportunities */}
                  <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-blue-500/20 text-blue-400 rounded-lg w-10 h-10 flex items-center justify-center text-xl">
                        🌟
                      </div>
                      <h3 className="text-blue-400 text-xl font-bold">Opportunities</h3>
                    </div>
                    <ul className="space-y-2">
                      {analysis.swot.opportunities.map((opportunity, index) => (
                        <li key={index} className="text-white text-sm flex items-start gap-2">
                          <span className="text-blue-400 mt-1">•</span>
                          <span>{opportunity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Threats */}
                  <div className="bg-gradient-to-br from-red-500/10 to-pink-500/10 backdrop-blur-xl border border-red-500/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-red-500/20 text-red-400 rounded-lg w-10 h-10 flex items-center justify-center text-xl">
                        ⚡
                      </div>
                      <h3 className="text-red-400 text-xl font-bold">Threats</h3>
                    </div>
                    <ul className="space-y-2">
                      {analysis.swot.threats.map((threat, index) => (
                        <li key={index} className="text-white text-sm flex items-start gap-2">
                          <span className="text-red-400 mt-1">•</span>
                          <span>{threat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Strategic Questions */}
                {analysis.strategic_questions && analysis.strategic_questions.length > 0 && (
                  <div className="bg-black/80 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-purple-500/20 text-purple-400 rounded-lg w-10 h-10 flex items-center justify-center text-xl">
                        🧠
                      </div>
                      <h3 className="text-purple-400 text-xl font-bold">Strategic Questions</h3>
                    </div>
                    <div className="space-y-3">
                      {analysis.strategic_questions.map((question, index) => (
                        <div key={index} className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
                          <p className="text-white text-sm">
                            <span className="text-purple-400 font-semibold">{index + 1}.</span> {question}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {!analysis && !loading && (
              <div className="bg-black/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6 text-center">
                <p className="text-gray-400 text-sm">
                  Enter an idea above and click "Analyze SWOT" to get started
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SWOTAnalyzer;
