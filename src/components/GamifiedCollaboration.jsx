import { useState } from 'react';

const GamifiedCollaboration = () => {
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
              <div className="text-5xl mb-4">🏆</div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Gamified Collaboration
              </h1>
              <p className="text-sm text-gray-400">
                Compete, collaborate, and earn rewards for your creative contributions
              </p>
            </div>

            {/* Stats Overview */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div className="bg-black/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-5 text-center">
                <div className="text-3xl mb-2">⭐</div>
                <div className="text-2xl font-bold text-white mb-1">1,250</div>
                <div className="text-xs text-gray-400">Total Points</div>
              </div>
              <div className="bg-black/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-5 text-center">
                <div className="text-3xl mb-2">🏅</div>
                <div className="text-2xl font-bold text-white mb-1">12</div>
                <div className="text-xs text-gray-400">Badges Earned</div>
              </div>
              <div className="bg-black/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-5 text-center">
                <div className="text-3xl mb-2">🔥</div>
                <div className="text-2xl font-bold text-white mb-1">7 Days</div>
                <div className="text-xs text-gray-400">Current Streak</div>
              </div>
              <div className="bg-black/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-5 text-center">
                <div className="text-3xl mb-2">📊</div>
                <div className="text-2xl font-bold text-white mb-1">#3</div>
                <div className="text-xs text-gray-400">Team Rank</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Leaderboard */}
              <div className="bg-black/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6">
                <h3 className="text-white text-lg font-semibold mb-4">Team Leaderboard</h3>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-yellow-500/20 to-transparent border border-yellow-500/30 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🥇</span>
                      <div>
                        <p className="text-white font-semibold text-sm">Sarah Chen</p>
                        <p className="text-xs text-gray-400">2,450 points</p>
                      </div>
                    </div>
                    <span className="text-yellow-400 font-bold">+150</span>
                  </div>
                  <div className="bg-gradient-to-r from-gray-400/20 to-transparent border border-gray-400/30 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🥈</span>
                      <div>
                        <p className="text-white font-semibold text-sm">Alex Kumar</p>
                        <p className="text-xs text-gray-400">1,890 points</p>
                      </div>
                    </div>
                    <span className="text-gray-400 font-bold">+95</span>
                  </div>
                  <div className="bg-gradient-to-r from-orange-600/20 to-transparent border border-orange-600/30 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🥉</span>
                      <div>
                        <p className="text-white font-semibold text-sm">You</p>
                        <p className="text-xs text-gray-400">1,250 points</p>
                      </div>
                    </div>
                    <span className="text-orange-400 font-bold">+80</span>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-lg text-gray-400">4</span>
                      <div>
                        <p className="text-white font-semibold text-sm">Jamie Lee</p>
                        <p className="text-xs text-gray-400">1,120 points</p>
                      </div>
                    </div>
                    <span className="text-blue-400 font-bold">+65</span>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-lg text-gray-400">5</span>
                      <div>
                        <p className="text-white font-semibold text-sm">Morgan Davis</p>
                        <p className="text-xs text-gray-400">980 points</p>
                      </div>
                    </div>
                    <span className="text-blue-400 font-bold">+50</span>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="bg-black/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6">
                <h3 className="text-white text-lg font-semibold mb-4">Recent Achievements</h3>
                <div className="space-y-3">
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">🎯</span>
                      <div>
                        <p className="text-white font-semibold text-sm">Idea Machine</p>
                        <p className="text-xs text-gray-400 mb-1">Added 50 ideas</p>
                        <span className="text-xs text-blue-400 font-semibold">+100 points</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">🔥</span>
                      <div>
                        <p className="text-white font-semibold text-sm">Week Warrior</p>
                        <p className="text-xs text-gray-400 mb-1">7-day contribution streak</p>
                        <span className="text-xs text-blue-400 font-semibold">+75 points</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">🤝</span>
                      <div>
                        <p className="text-white font-semibold text-sm">Team Player</p>
                        <p className="text-xs text-gray-400 mb-1">Collaborated on 10 projects</p>
                        <span className="text-xs text-blue-400 font-semibold">+50 points</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-700/20 border border-gray-600/30 rounded-xl p-4 opacity-60">
                    <div className="flex items-start gap-3">
                      <span className="text-3xl grayscale">💎</span>
                      <div>
                        <p className="text-gray-400 font-semibold text-sm">Innovation Master</p>
                        <p className="text-xs text-gray-500 mb-1">Add 100 ideas</p>
                        <span className="text-xs text-gray-500">Locked - 50/100</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Challenges */}
            <div className="mt-6 bg-black/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6">
              <h3 className="text-white text-lg font-semibold mb-4">Active Team Challenges</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-5">
                  <h4 className="text-white font-semibold mb-2">Innovation Sprint</h4>
                  <p className="text-xs text-gray-400 mb-3">Generate 100 team ideas this week</p>
                  <div className="mb-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-white font-semibold">73/100</span>
                    </div>
                    <div className="w-full h-2 bg-blue-500/20 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{width: '73%'}}></div>
                    </div>
                  </div>
                  <p className="text-xs text-blue-400">Reward: 500 team points</p>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-5">
                  <h4 className="text-white font-semibold mb-2">Diversity Champion</h4>
                  <p className="text-xs text-gray-400 mb-3">Achieve 80% diversity score</p>
                  <div className="mb-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">Current Score</span>
                      <span className="text-white font-semibold">75%</span>
                    </div>
                    <div className="w-full h-2 bg-blue-500/20 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-400 rounded-full" style={{width: '75%'}}></div>
                    </div>
                  </div>
                  <p className="text-xs text-blue-400">Reward: Exclusive badge</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamifiedCollaboration;
