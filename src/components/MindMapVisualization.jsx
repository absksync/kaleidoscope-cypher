import { useState } from 'react';

const MindMapVisualization = () => {
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
              <div className="text-5xl mb-4">🗺️</div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                MindMap Visualization
              </h1>
              <p className="text-sm text-gray-400">
                Create and explore visual mind maps of your ideas
              </p>
            </div>

            {/* Toolbar */}
            <div className="mb-6 bg-black/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-4">
              <div className="flex flex-wrap gap-3 items-center justify-between">
                <div className="flex gap-2">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all border border-blue-500/50">
                    + Add Node
                  </button>
                  <button className="bg-black/50 hover:bg-blue-500/20 text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all border border-blue-500/30">
                    Connect
                  </button>
                  <button className="bg-black/50 hover:bg-blue-500/20 text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all border border-blue-500/30">
                    Auto-Layout
                  </button>
                </div>
                <div className="flex gap-2">
                  <button className="bg-black/50 hover:bg-blue-500/20 text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all border border-blue-500/30">
                    Export PNG
                  </button>
                  <button className="bg-black/50 hover:bg-blue-500/20 text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all border border-blue-500/30">
                    Share
                  </button>
                </div>
              </div>
            </div>

            {/* Mind Map Canvas */}
            <div className="mb-6 bg-black/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-8" style={{minHeight: '500px'}}>
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Central Node */}
                <div className="absolute bg-blue-600 border-2 border-blue-400 rounded-2xl px-6 py-4 shadow-lg shadow-blue-500/30">
                  <p className="text-white font-bold text-sm">Product Launch Strategy</p>
                </div>
                
                {/* Branch Nodes */}
                <div className="absolute bg-blue-500/30 border border-blue-500 rounded-xl px-4 py-3 top-16 left-32">
                  <p className="text-white text-sm">Marketing</p>
                </div>
                <div className="absolute bg-blue-500/30 border border-blue-500 rounded-xl px-4 py-3 top-16 right-32">
                  <p className="text-white text-sm">Development</p>
                </div>
                <div className="absolute bg-blue-500/30 border border-blue-500 rounded-xl px-4 py-3 bottom-16 left-24">
                  <p className="text-white text-sm">Sales</p>
                </div>
                <div className="absolute bg-blue-500/30 border border-blue-500 rounded-xl px-4 py-3 bottom-16 right-24">
                  <p className="text-white text-sm">Operations</p>
                </div>
                
                {/* Sub-nodes */}
                <div className="absolute bg-blue-500/20 border border-blue-400/50 rounded-lg px-3 py-2 top-4 left-20 text-xs text-gray-300">
                  Social Media
                </div>
                <div className="absolute bg-blue-500/20 border border-blue-400/50 rounded-lg px-3 py-2 top-32 left-8 text-xs text-gray-300">
                  Email Campaign
                </div>
                <div className="absolute bg-blue-500/20 border border-blue-400/50 rounded-lg px-3 py-2 top-4 right-20 text-xs text-gray-300">
                  Feature Set
                </div>
                <div className="absolute bg-blue-500/20 border border-blue-400/50 rounded-lg px-3 py-2 top-32 right-8 text-xs text-gray-300">
                  Testing
                </div>

                {/* Connection lines (SVG overlay would go here in real implementation) */}
                <div className="absolute inset-0 pointer-events-none">
                  <svg className="w-full h-full">
                    <line x1="50%" y1="50%" x2="25%" y2="20%" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="2"/>
                    <line x1="50%" y1="50%" x2="75%" y2="20%" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="2"/>
                    <line x1="50%" y1="50%" x2="25%" y2="80%" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="2"/>
                    <line x1="50%" y1="50%" x2="75%" y2="80%" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="2"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Node Details Panel */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-black/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6">
                <h3 className="text-white text-lg font-semibold mb-4">Add New Node</h3>
                <input 
                  type="text"
                  className="w-full bg-black/50 border border-blue-500/30 rounded-xl p-3 text-white text-sm mb-3 focus:outline-none focus:border-blue-500"
                  placeholder="Node title..."
                />
                <textarea 
                  className="w-full bg-black/50 border border-blue-500/30 rounded-xl p-3 text-white text-sm resize-none focus:outline-none focus:border-blue-500 h-24 mb-3"
                  placeholder="Node description..."
                ></textarea>
                <select className="w-full bg-black/50 border border-blue-500/30 rounded-xl p-3 text-white text-sm mb-3 focus:outline-none focus:border-blue-500">
                  <option>Select parent node</option>
                  <option>Product Launch Strategy (Root)</option>
                  <option>Marketing</option>
                  <option>Development</option>
                  <option>Sales</option>
                  <option>Operations</option>
                </select>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-semibold text-sm transition-all border border-blue-500/50">
                  Add to Map
                </button>
              </div>

              <div className="bg-black/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6">
                <h3 className="text-white text-lg font-semibold mb-4">Map Statistics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-blue-500/20">
                    <span className="text-gray-400 text-sm">Total Nodes</span>
                    <span className="text-white font-semibold">12</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-blue-500/20">
                    <span className="text-gray-400 text-sm">Connections</span>
                    <span className="text-white font-semibold">18</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-blue-500/20">
                    <span className="text-gray-400 text-sm">Depth Levels</span>
                    <span className="text-white font-semibold">3</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-blue-500/20">
                    <span className="text-gray-400 text-sm">Contributors</span>
                    <span className="text-white font-semibold">5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Last Modified</span>
                    <span className="text-white font-semibold">2 min ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MindMapVisualization;
