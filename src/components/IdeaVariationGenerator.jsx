import { useState } from 'react';
import EnhancedApiService from '../services/enhancedApi';

const IdeaVariationGenerator = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [ideaText, setIdeaText] = useState('');
  const [loading, setLoading] = useState(false);
  const [variations, setVariations] = useState(null);
  const [error, setError] = useState('');
  const [backendStatus, setBackendStatus] = useState('checking');

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const checkBackend = async () => {
    try {
      const health = await EnhancedApiService.healthCheck();
      setBackendStatus(health ? 'connected' : 'offline');
    } catch (error) {
      setBackendStatus('offline');
    }
  };

  const handleGenerateVariations = async () => {
    if (!ideaText.trim()) {
      setError('Please enter an idea first');
      return;
    }

    setLoading(true);
    setError('');
    setVariations(null);

    try {
      const result = await EnhancedApiService.generateIdeaVariations(ideaText);
      setVariations(result);
    } catch (err) {
      setError(err.message || 'Failed to generate variations. Make sure backend (Port 5000) is running.');
    } finally {
      setLoading(false);
    }
  };

  // Check backend on mount
  useState(() => {
    checkBackend();
  }, []);

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
              <div className="text-5xl mb-4">💡</div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Idea Variation Generator
              </h1>
              <p className="text-sm text-gray-400">
                Enter your initial idea and generate creative variations instantly
              </p>
            </div>

            {/* Input Section */}
            <div className="mb-8 bg-black/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6">
              <h3 className="text-white text-lg font-semibold mb-4">Your Base Idea</h3>
              <textarea 
                className="w-full bg-black/50 border border-blue-500/30 rounded-xl p-4 text-white text-base resize-none focus:outline-none focus:border-blue-500 transition-colors h-32 mb-4"
                placeholder="Describe your initial idea here... (e.g., 'A mobile app for tracking daily habits')"
                value={ideaText}
                onChange={(e) => setIdeaText(e.target.value)}
              ></textarea>
              
              {error && (
                <div className="mb-4 bg-red-500/20 border border-red-500/50 rounded-xl p-3 text-red-300 text-sm">
                  {error}
                </div>
              )}

              <button 
                onClick={handleGenerateVariations}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold text-base transition-all duration-300 border border-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Generating Variations...' : 'Generate Variations'}
              </button>
            </div>

            {/* Generated Variations */}
            {variations && (
              <div className="bg-black/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6">
                <h3 className="text-white text-lg font-semibold mb-2">Generated Variations</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Method: <span className="text-blue-400 font-semibold">{variations.method_used}</span> - {variations.description}
                </p>
                <div className="space-y-4">
                  {variations.generated_ideas.map((variation, index) => (
                    <div key={index} className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-5">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-blue-400 text-xs font-semibold">
                          VARIATION {index + 1} - {variation.technique}
                          {variation.stimulus && ` (${variation.stimulus})`}
                        </span>
                      </div>
                      <p className="text-white text-sm mb-3">
                        {variation.variation_text}
                      </p>
                      <p className="text-gray-400 text-xs italic">
                        {variation.reasoning}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!variations && !loading && (
              <div className="bg-black/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6 text-center">
                <p className="text-gray-400 text-sm">
                  Enter an idea above and click "Generate Variations" to get started
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaVariationGenerator;
