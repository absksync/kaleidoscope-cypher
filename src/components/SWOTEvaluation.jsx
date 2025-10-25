import { useState } from 'react';

const SWOTEvaluation = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
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
              <div className="text-5xl mb-4">📊</div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                SWOT Evaluation
              </h1>
              <p className="text-sm text-gray-400">
                Analyze your ideas from all strategic angles
              </p>
            </div>

            {/* SWOT Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Strengths */}
              <div className="bg-black/80 backdrop-blur-xl border border-green-500/30 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">💪</span>
                  <h3 className="text-white text-lg font-semibold">Strengths</h3>
                </div>
                <textarea 
                  className="w-full bg-black/50 border border-green-500/30 rounded-xl p-4 text-white text-sm resize-none focus:outline-none focus:border-green-500 transition-colors h-32 mb-3"
                  placeholder="What advantages does this idea have?"
                ></textarea>
                <div className="space-y-2">
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                    <p className="text-white text-sm">✓ First-mover advantage in the market</p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                    <p className="text-white text-sm">✓ Strong technical team with expertise</p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                    <p className="text-white text-sm">✓ Unique value proposition</p>
                  </div>
                </div>
                <button className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-semibold text-sm transition-all border border-green-500/50">
                  + Add Strength
                </button>
              </div>

              {/* Weaknesses */}
              <div className="bg-black/80 backdrop-blur-xl border border-red-500/30 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">⚠️</span>
                  <h3 className="text-white text-lg font-semibold">Weaknesses</h3>
                </div>
                <textarea 
                  className="w-full bg-black/50 border border-red-500/30 rounded-xl p-4 text-white text-sm resize-none focus:outline-none focus:border-red-500 transition-colors h-32 mb-3"
                  placeholder="What could be improved?"
                ></textarea>
                <div className="space-y-2">
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                    <p className="text-white text-sm">✗ Limited initial budget</p>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                    <p className="text-white text-sm">✗ No established brand recognition</p>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                    <p className="text-white text-sm">✗ Dependency on third-party APIs</p>
                  </div>
                </div>
                <button className="w-full mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl font-semibold text-sm transition-all border border-red-500/50">
                  + Add Weakness
                </button>
              </div>

              {/* Opportunities */}
              <div className="bg-black/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">🚀</span>
                  <h3 className="text-white text-lg font-semibold">Opportunities</h3>
                </div>
                <textarea 
                  className="w-full bg-black/50 border border-blue-500/30 rounded-xl p-4 text-white text-sm resize-none focus:outline-none focus:border-blue-500 transition-colors h-32 mb-3"
                  placeholder="What external factors could help?"
                ></textarea>
                <div className="space-y-2">
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                    <p className="text-white text-sm">→ Growing market demand</p>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                    <p className="text-white text-sm">→ Strategic partnership possibilities</p>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                    <p className="text-white text-sm">→ Emerging technology trends</p>
                  </div>
                </div>
                <button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold text-sm transition-all border border-blue-500/50">
                  + Add Opportunity
                </button>
              </div>

              {/* Threats */}
              <div className="bg-black/80 backdrop-blur-xl border border-orange-500/30 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">⚡</span>
                  <h3 className="text-white text-lg font-semibold">Threats</h3>
                </div>
                <textarea 
                  className="w-full bg-black/50 border border-orange-500/30 rounded-xl p-4 text-white text-sm resize-none focus:outline-none focus:border-orange-500 transition-colors h-32 mb-3"
                  placeholder="What external challenges exist?"
                ></textarea>
                <div className="space-y-2">
                  <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3">
                    <p className="text-white text-sm">! Strong existing competitors</p>
                  </div>
                  <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3">
                    <p className="text-white text-sm">! Regulatory changes possible</p>
                  </div>
                  <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3">
                    <p className="text-white text-sm">! Economic uncertainty</p>
                  </div>
                </div>
                <button className="w-full mt-3 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-xl font-semibold text-sm transition-all border border-orange-500/50">
                  + Add Threat
                </button>
              </div>
            </div>

            {/* Action Items */}
            <div className="bg-black/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6">
              <h3 className="text-white text-lg font-semibold mb-4">Strategic Action Items</h3>
              <div className="space-y-3">
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <span className="text-xs text-blue-400 font-semibold">LEVERAGE STRENGTH + OPPORTUNITY</span>
                      <p className="text-white text-sm mt-1">Use technical expertise to capitalize on market demand by developing advanced features competitors lack</p>
                    </div>
                    <button className="ml-3 text-xs text-gray-400 hover:text-white">Edit</button>
                  </div>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <span className="text-xs text-orange-400 font-semibold">MITIGATE WEAKNESS + THREAT</span>
                      <p className="text-white text-sm mt-1">Build brand recognition through content marketing to compete with established players</p>
                    </div>
                    <button className="ml-3 text-xs text-gray-400 hover:text-white">Edit</button>
                  </div>
                </div>
              </div>
              <button className="w-full mt-4 bg-white text-black px-6 py-3 rounded-xl font-semibold text-sm hover:bg-gray-200 transition-all">
                Generate AI Recommendations
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SWOTEvaluation;
