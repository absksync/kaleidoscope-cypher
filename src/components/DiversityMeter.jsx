import { useState } from 'react';

const DiversityMeter = () => {
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
              <div className="text-5xl mb-4">🎯</div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Diversity Meter
              </h1>
              <p className="text-sm text-gray-400">
                Add your ideas below and track creative variety in real-time
              </p>
            </div>

            {/* Diversity Score Display */}
            <div className="mb-8 bg-black/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6">
              <div className="text-center">
                <h2 className="text-white text-lg font-semibold mb-4">Diversity Score</h2>
                <div className="flex justify-center items-center gap-4">
                  <div className="relative w-32 h-32">
                    <svg className="transform -rotate-90 w-32 h-32">
                      <circle cx="64" cy="64" r="56" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="8" fill="none" />
                      <circle cx="64" cy="64" r="56" stroke="rgb(59, 130, 246)" strokeWidth="8" fill="none" 
                        strokeDasharray="351.86" strokeDashoffset="263.9" strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold text-white">75%</span>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-gray-400 text-sm mb-2">Categories Detected: <span className="text-white font-semibold">5</span></p>
                    <p className="text-gray-400 text-sm mb-2">Ideas Added: <span className="text-white font-semibold">12</span></p>
                    <p className="text-gray-400 text-sm">Coverage: <span className="text-green-400 font-semibold">Good</span></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Idea Input Section */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-black/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6">
                <h3 className="text-white text-lg font-semibold mb-4">Add Your Ideas</h3>
                <textarea 
                  className="w-full bg-black/50 border border-blue-500/30 rounded-xl p-4 text-white text-sm resize-none focus:outline-none focus:border-blue-500 transition-colors h-32 mb-4"
                  placeholder="Type your idea here..."
                ></textarea>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 border border-blue-500/50">
                  Add Idea
                </button>
              </div>

              <div className="bg-black/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6">
                <h3 className="text-white text-lg font-semibold mb-4">Category Breakdown</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Technology</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-blue-500/20 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{width: '60%'}}></div>
                      </div>
                      <span className="text-white text-sm font-semibold">60%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Marketing</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-blue-500/20 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-400 rounded-full" style={{width: '40%'}}></div>
                      </div>
                      <span className="text-white text-sm font-semibold">40%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Design</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-blue-500/20 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-300 rounded-full" style={{width: '50%'}}></div>
                      </div>
                      <span className="text-white text-sm font-semibold">50%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Business</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-blue-500/20 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-200 rounded-full" style={{width: '30%'}}></div>
                      </div>
                      <span className="text-white text-sm font-semibold">30%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Other</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-blue-500/20 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-100 rounded-full" style={{width: '20%'}}></div>
                      </div>
                      <span className="text-white text-sm font-semibold">20%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ideas List */}
            <div className="mt-6 bg-black/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6">
              <h3 className="text-white text-lg font-semibold mb-4">Your Ideas</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 flex justify-between items-start">
                  <div>
                    <span className="text-xs text-blue-400 font-semibold">Technology</span>
                    <p className="text-white text-sm mt-1">AI-powered customer service chatbot</p>
                  </div>
                  <button className="text-red-400 hover:text-red-300 text-xs">Delete</button>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 flex justify-between items-start">
                  <div>
                    <span className="text-xs text-blue-400 font-semibold">Marketing</span>
                    <p className="text-white text-sm mt-1">Social media campaign for product launch</p>
                  </div>
                  <button className="text-red-400 hover:text-red-300 text-xs">Delete</button>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 flex justify-between items-start">
                  <div>
                    <span className="text-xs text-blue-400 font-semibold">Design</span>
                    <p className="text-white text-sm mt-1">Redesign mobile app interface</p>
                  </div>
                  <button className="text-red-400 hover:text-red-300 text-xs">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiversityMeter;
