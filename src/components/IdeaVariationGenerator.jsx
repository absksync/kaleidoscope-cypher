import { useState } from 'react';

const IdeaVariationGenerator = () => {
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
              ></textarea>
              
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Creativity Level</label>
                  <select className="w-full bg-black/50 border border-blue-500/30 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-blue-500">
                    <option>Conservative</option>
                    <option selected>Balanced</option>
                    <option>Wild</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Number of Variations</label>
                  <select className="w-full bg-black/50 border border-blue-500/30 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-blue-500">
                    <option>3</option>
                    <option selected>5</option>
                    <option>10</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Perspective</label>
                  <select className="w-full bg-black/50 border border-blue-500/30 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-blue-500">
                    <option>User-Centric</option>
                    <option>Business-Focused</option>
                    <option selected>Technical</option>
                    <option>Creative</option>
                  </select>
                </div>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold text-base transition-all duration-300 border border-blue-500/50">
                Generate Variations
              </button>
            </div>

            {/* Generated Variations */}
            <div className="bg-black/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6">
              <h3 className="text-white text-lg font-semibold mb-4">Generated Variations</h3>
              <div className="space-y-4">
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-5">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-blue-400 text-xs font-semibold">VARIATION 1 - User-Centric Approach</span>
                    <div className="flex gap-2">
                      <button className="text-xs text-gray-400 hover:text-white">Save</button>
                      <button className="text-xs text-gray-400 hover:text-white">Expand</button>
                    </div>
                  </div>
                  <p className="text-white text-sm">
                    A gamified habit tracker that uses social accountability features, allowing users to join habit-building communities and compete on leaderboards while earning rewards for consistency.
                  </p>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-5">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-blue-400 text-xs font-semibold">VARIATION 2 - Minimalist Design</span>
                    <div className="flex gap-2">
                      <button className="text-xs text-gray-400 hover:text-white">Save</button>
                      <button className="text-xs text-gray-400 hover:text-white">Expand</button>
                    </div>
                  </div>
                  <p className="text-white text-sm">
                    An ultra-simple habit tracker focused on streak visualization, with a clean interface that shows only your current streaks and a calendar view with color-coded success markers.
                  </p>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-5">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-blue-400 text-xs font-semibold">VARIATION 3 - AI-Powered Assistant</span>
                    <div className="flex gap-2">
                      <button className="text-xs text-gray-400 hover:text-white">Save</button>
                      <button className="text-xs text-gray-400 hover:text-white">Expand</button>
                    </div>
                  </div>
                  <p className="text-white text-sm">
                    A smart habit coach app that uses machine learning to identify optimal times for habit execution, sends personalized motivational messages, and adapts difficulty based on success patterns.
                  </p>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-5">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-blue-400 text-xs font-semibold">VARIATION 4 - Wearable Integration</span>
                    <div className="flex gap-2">
                      <button className="text-xs text-gray-400 hover:text-white">Save</button>
                      <button className="text-xs text-gray-400 hover:text-white">Expand</button>
                    </div>
                  </div>
                  <p className="text-white text-sm">
                    A habit tracking system that integrates with smartwatches and fitness bands, automatically detecting certain habits (like exercise, sleep) and using biometric data to suggest optimal habit timing.
                  </p>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-5">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-blue-400 text-xs font-semibold">VARIATION 5 - Collaborative Habits</span>
                    <div className="flex gap-2">
                      <button className="text-xs text-gray-400 hover:text-white">Save</button>
                      <button className="text-xs text-gray-400 hover:text-white">Expand</button>
                    </div>
                  </div>
                  <p className="text-white text-sm">
                    A family/team-oriented habit tracker where groups can create shared habits, track collective progress, and celebrate milestones together with synchronized notifications and group challenges.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaVariationGenerator;
