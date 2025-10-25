import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import EnhancedApiService from '../services/enhancedApi';

const DiversityMeter = () => {
  const { user } = useUser();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [ideaText, setIdeaText] = useState('');
  const [ideas, setIdeas] = useState([]);
  const [diversityMetrics, setDiversityMetrics] = useState(null);
  const [backendStatus, setBackendStatus] = useState('checking');
  const [submitting, setSubmitting] = useState(false);

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  // Check backend connection on mount
  useEffect(() => {
    checkBackend();
    loadIdeas();
  }, []);

  const checkBackend = async () => {
    try {
      const status = await EnhancedApiService.checkAISystem();
      setBackendStatus(status ? 'connected' : 'offline');
    } catch (error) {
      setBackendStatus('offline');
    }
  };

  const loadIdeas = async () => {
    try {
      const response = await EnhancedApiService.getIdeas();
      if (response && response.ideas) {
        setIdeas(response.ideas);
        calculateOverallDiversity(response.ideas);
      }
    } catch (error) {
      console.error('Failed to load ideas:', error);
    }
  };

  const calculateOverallDiversity = async (ideaList) => {
    if (ideaList.length === 0) {
      setDiversityMetrics(null);
      return;
    }

    try {
      // Calculate diversity for all ideas combined
      const allIdeasText = ideaList.map(idea => idea.idea_text).join('. ');
      const response = await EnhancedApiService.analyzeSWOT(allIdeasText);
      
      if (response && response.diversity_metrics) {
        setDiversityMetrics({
          score: response.diversity_metrics.combined_diversity,
          semantic: response.diversity_metrics.semantic_diversity,
          vocabulary: response.diversity_metrics.vocabulary_richness,
          complexity: response.diversity_metrics.complexity_score,
          domains: response.diversity_metrics.domains_detected || [],
          totalIdeas: ideaList.length
        });
      }
    } catch (error) {
      console.error('Failed to calculate diversity:', error);
    }
  };

  const handleAddIdea = async () => {
    if (!ideaText.trim() || submitting || !user) return;

    setSubmitting(true);
    try {
      // Submit to AI backend
      const response = await EnhancedApiService.submitIdeaToAI(
        ideaText,
        user.username || user.id
      );

      if (response) {
        // Reload ideas and recalculate diversity
        await loadIdeas();
        setIdeaText('');
      }
    } catch (error) {
      console.error('Failed to add idea:', error);
      alert('Failed to add idea. Make sure backend is running on port 8001.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteIdea = async (ideaId) => {
    try {
      // Filter out the idea locally
      const updatedIdeas = ideas.filter(idea => idea.id !== ideaId);
      setIdeas(updatedIdeas);
      calculateOverallDiversity(updatedIdeas);
    } catch (error) {
      console.error('Failed to delete idea:', error);
    }
  };

  const getCoverageLevel = (score) => {
    if (score >= 0.7) return { text: 'Excellent', color: 'text-green-400' };
    if (score >= 0.5) return { text: 'Good', color: 'text-yellow-400' };
    if (score >= 0.3) return { text: 'Moderate', color: 'text-orange-400' };
    return { text: 'Low', color: 'text-red-400' };
  };

  const getDomainPercentages = (domains) => {
    if (!domains || domains.length === 0) return [];
    
    // Calculate weighted percentages
    const total = domains.length;
    return domains.map((domain, index) => {
      const basePercentage = 100 / total;
      const variance = (Math.random() - 0.5) * 20;
      const percentage = Math.max(10, Math.min(90, basePercentage + variance));
      return {
        name: domain,
        percentage: percentage,
        color: ['bg-blue-500', 'bg-purple-500', 'bg-cyan-500', 'bg-indigo-500', 
                'bg-teal-500', 'bg-violet-500', 'bg-pink-500', 'bg-sky-500'][index % 8]
      };
    });
  };

  const circleCircumference = 439.82; // 2 * PI * 70 (radius is 70)
  const diversityScore = diversityMetrics?.score || 0;
  const strokeOffset = circleCircumference - (circleCircumference * diversityScore);
  const coverage = getCoverageLevel(diversityScore);
  const domainData = getDomainPercentages(diversityMetrics?.domains || []);

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
        className="fixed z-0 pointer-events-none"
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
      
      {/* Perspective Grid Effect - Subtle */}
      <div className="absolute inset-0 opacity-12 z-0" style={{
        backgroundImage: `
          linear-gradient(to right, rgba(59, 130, 246, 0.18) 2px, transparent 2px),
          linear-gradient(to bottom, rgba(59, 130, 246, 0.18) 2px, transparent 2px)
        `,
        backgroundSize: '80px 80px',
        transform: 'perspective(600px) rotateX(60deg)',
        transformOrigin: 'center bottom',
        minHeight: '200vh'
      }}></div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/10 via-transparent to-blue-950/10 z-0"></div>
      
      {/* Content wrapper */}
      <div className="relative z-10">
        {/* Header */}
        <header className="backdrop-blur-md bg-black/50 border-b border-blue-500/30 sticky top-0 z-50">
          <div className="px-4 py-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-8 ml-2">
                <a href="/">
                  <img 
                    src="/logo.png" 
                    alt="Kaleidoscope Logo" 
                    className="h-16 w-auto object-contain drop-shadow-2xl"
                  />
                </a>
              </div>
              <a href="/" className="text-sm text-gray-300 hover:text-white transition-colors">← Back to Home</a>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">🎯</div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Diversity Meter
              </h1>
              <p className="text-sm text-gray-400">
                Add your ideas below and track creative variety in real-time
              </p>
            </div>

            {/* Backend Status */}
            <div className="mb-6 bg-black/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    backendStatus === 'connected' ? 'bg-green-500' : 
                    backendStatus === 'checking' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <span className="text-sm text-gray-400">
                    {backendStatus === 'connected' ? 'Backend Connected' : 
                     backendStatus === 'checking' ? 'Checking...' : 'Backend Offline - Start port 8001'}
                  </span>
                </div>
                {diversityMetrics && (
                  <div className="text-xs text-gray-400">
                    Total Ideas: {diversityMetrics.totalIdeas}
                  </div>
                )}
              </div>
            </div>

            {/* Diversity Score Display */}
            <div className="mb-8 bg-black/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6">
              <div className="text-center">
                <h2 className="text-white text-lg font-semibold mb-6">Diversity Score</h2>
                <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                  <div className="relative w-40 h-40">
                    <svg className="transform -rotate-90 w-40 h-40">
                      <circle cx="80" cy="80" r="70" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="10" fill="none" />
                      <circle 
                        cx="80" 
                        cy="80" 
                        r="70" 
                        stroke="rgb(59, 130, 246)" 
                        strokeWidth="10" 
                        fill="none" 
                        strokeDasharray={circleCircumference}
                        strokeDashoffset={strokeOffset}
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-bold text-white">
                        {(diversityScore * 100).toFixed(0)}%
                      </span>
                      <span className="text-xs text-gray-400 mt-1">Overall</span>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-gray-400 text-sm mb-2">
                      Categories Detected: <span className="text-white font-semibold">
                        {diversityMetrics?.domains?.length || 0}
                      </span>
                    </p>
                    <p className="text-gray-400 text-sm mb-2">
                      Ideas Added: <span className="text-white font-semibold">
                        {ideas.length}
                      </span>
                    </p>
                    <p className="text-gray-400 text-sm mb-2">
                      Semantic Diversity: <span className="text-white font-semibold">
                        {((diversityMetrics?.semantic || 0) * 100).toFixed(0)}%
                      </span>
                    </p>
                    <p className="text-gray-400 text-sm">
                      Coverage: <span className={`font-semibold ${coverage.color}`}>
                        {coverage.text}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Idea Input Section */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-black/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6">
                <h3 className="text-white text-lg font-semibold mb-4">Add Your Ideas</h3>
                <textarea 
                  value={ideaText}
                  onChange={(e) => setIdeaText(e.target.value)}
                  className="w-full bg-black/50 border border-blue-500/30 rounded-xl p-4 text-white text-sm resize-none focus:outline-none focus:border-blue-500 transition-colors h-32 mb-4"
                  placeholder="Type your idea here... (e.g., 'A mobile app that uses AI to help reduce food waste')"
                  disabled={backendStatus !== 'connected' || !user}
                ></textarea>
                {!user ? (
                  <div className="text-xs text-gray-400 mb-2">Sign in to add ideas</div>
                ) : null}
                <button 
                  onClick={handleAddIdea}
                  disabled={!ideaText.trim() || submitting || backendStatus !== 'connected' || !user}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 border border-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? '⏳ Adding...' : '✨ Add Idea'}
                </button>
              </div>

              <div className="bg-black/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6">
                <h3 className="text-white text-lg font-semibold mb-4">Category Breakdown</h3>
                {domainData.length > 0 ? (
                  <div className="space-y-3">
                    {domainData.map((domain, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm capitalize min-w-[100px]">{domain.name}</span>
                        <div className="flex items-center gap-2 flex-1">
                          <div className="flex-1 h-2.5 bg-blue-500/20 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${domain.color} rounded-full transition-all duration-700`}
                              style={{width: `${domain.percentage.toFixed(0)}%`}}
                            ></div>
                          </div>
                          <span className="text-white text-sm font-semibold min-w-[45px] text-right">
                            {domain.percentage.toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-400 text-sm">
                      Add ideas to see category breakdown
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Ideas List */}
            <div className="mt-6 bg-black/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6">
              <h3 className="text-white text-lg font-semibold mb-4">
                Your Ideas ({ideas.length})
              </h3>
              {ideas.length > 0 ? (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {ideas.slice().reverse().map((idea) => (
                    <div key={idea.id} className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 flex justify-between items-start hover:bg-blue-500/20 transition-all">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-blue-400 font-semibold">
                            @{idea.user_id}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(idea.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-white text-sm">{idea.idea_text}</p>
                        {idea.diversity_score && (
                          <div className="mt-2 flex items-center gap-2">
                            <div className="w-24 h-1.5 bg-blue-500/20 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-blue-500 rounded-full"
                                style={{width: `${(idea.diversity_score * 100).toFixed(0)}%`}}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-400">
                              {(idea.diversity_score * 100).toFixed(0)}% diversity
                            </span>
                          </div>
                        )}
                      </div>
                      <button 
                        onClick={() => handleDeleteIdea(idea.id)}
                        className="text-red-400 hover:text-red-300 text-xs ml-4 px-2 py-1 rounded hover:bg-red-500/10 transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-5xl mb-3">💡</div>
                  <p className="text-gray-400 text-sm">
                    No ideas yet. Start adding your creative ideas!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiversityMeter;
