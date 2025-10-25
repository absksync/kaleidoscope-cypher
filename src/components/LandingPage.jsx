import React, { useState, useEffect, useRef } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

const LandingPage = () => {
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [showSolutionsDropdown, setShowSolutionsDropdown] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const dropdownRef = useRef(null);
  const solutionsDropdownRef = useRef(null);

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProductDropdown(false);
      }
      if (solutionsDropdownRef.current && !solutionsDropdownRef.current.contains(event.target)) {
        setShowSolutionsDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
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
        {/* Top Banner */}
        <div className="bg-black/50 backdrop-blur-md border-b border-blue-500/30">
          <div className="container mx-auto px-6 py-3 text-center">
            <p className="text-xs text-gray-400">
            Meet the AI Innovation Workspace, your platform for getting great done.{' '}
            <span className="text-blue-400 font-semibold ml-2 bg-blue-500/10 px-3 py-1 rounded-full inline-block border border-blue-500/30 text-xs">
              SEE WHAT'S POSSIBLE
            </span>
          </p>
        </div>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 backdrop-blur-xl bg-black/70 border-b border-blue-500/30 z-50 transition-all duration-300">
        <div className="px-4 py-2.5">
          <div className="flex justify-between items-center">
            {/* Logo and Navigation on Left */}
            <div className="flex items-center gap-8 ml-2">
              <img 
                src="/logo.png" 
                alt="Kaleidoscope Logo" 
                className="h-20 w-auto object-contain drop-shadow-2xl"
              />
              
              {/* Navigation Items */}
              <nav className="hidden lg:flex items-center gap-6 text-gray-300 font-medium text-sm">
                <div className="relative" ref={dropdownRef}>
                  <button 
                    onClick={() => setShowProductDropdown(!showProductDropdown)}
                    className="hover:text-white transition-all duration-200 flex items-center gap-1 hover:scale-105"
                  >
                    Product <span className="text-xs">▾</span>
                  </button>
                  
                  {/* Product Dropdown */}
                  {showProductDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-72 bg-black backdrop-blur-xl border border-blue-500/30 rounded-2xl shadow-2xl shadow-blue-500/20 p-4 z-50">
                      <div className="space-y-3">
                        <a href="/diversity-meter" className="block p-4 hover:bg-blue-500/10 rounded-xl transition-all duration-200 cursor-pointer group border border-transparent hover:border-blue-500/30">
                          <div className="flex items-start gap-3">
                            <div className="text-2xl group-hover:scale-110 transition-transform duration-300">🎯</div>
                            <div>
                              <h4 className="text-white font-bold text-sm mb-1">Diversity Meter</h4>
                              <p className="text-gray-300 text-xs">Track creative variety</p>
                            </div>
                          </div>
                        </a>
                        
                        <a href="/idea-variation-generator" className="block p-4 hover:bg-blue-500/10 rounded-xl transition-all duration-200 cursor-pointer group border border-transparent hover:border-blue-500/30">
                          <div className="flex items-start gap-3">
                            <div className="text-2xl group-hover:scale-110 transition-transform duration-300">💡</div>
                            <div>
                              <h4 className="text-white font-bold text-sm mb-1">Idea Variation Generator</h4>
                              <p className="text-gray-300 text-xs">Generate diverse ideas</p>
                            </div>
                          </div>
                        </a>
                        
                        <a href="/gamified-collaboration" className="block p-4 hover:bg-blue-500/10 rounded-xl transition-all duration-200 cursor-pointer group border border-transparent hover:border-blue-500/30">
                          <div className="flex items-start gap-3">
                            <div className="text-2xl group-hover:scale-110 transition-transform duration-300">🏆</div>
                            <div>
                              <h4 className="text-white font-bold text-sm mb-1">Gamified Collaboration</h4>
                              <p className="text-gray-300 text-xs">Motivate your team</p>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Solutions Dropdown */}
                <div className="relative" ref={solutionsDropdownRef}>
                  <button 
                    onClick={() => setShowSolutionsDropdown(!showSolutionsDropdown)}
                    className="hover:text-white transition-all duration-200 flex items-center gap-1 hover:scale-105"
                  >
                    Solutions <span className="text-xs">▾</span>
                  </button>
                  
                  {showSolutionsDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-72 bg-black backdrop-blur-xl border border-blue-500/30 rounded-2xl shadow-2xl shadow-blue-500/20 p-4 z-50">
                      <div className="space-y-3">
                        <a href="/mindmap-visualization" className="block p-4 hover:bg-blue-500/10 rounded-xl transition-all duration-200 cursor-pointer group border border-transparent hover:border-blue-500/30">
                          <div className="flex items-start gap-3">
                            <div className="text-2xl group-hover:scale-110 transition-transform duration-300">🗺️</div>
                            <div>
                              <h4 className="text-white font-bold text-sm mb-1">MindMap Visualization</h4>
                              <p className="text-gray-300 text-xs">See ideas connect</p>
                            </div>
                          </div>
                        </a>
                        
                        <a href="/swot-evaluation" className="block p-4 hover:bg-blue-500/10 rounded-xl transition-all duration-200 cursor-pointer group border border-transparent hover:border-blue-500/30">
                          <div className="flex items-start gap-3">
                            <div className="text-2xl group-hover:scale-110 transition-transform duration-300">📊</div>
                            <div>
                              <h4 className="text-white font-bold text-sm mb-1">SWOT Evaluation</h4>
                              <p className="text-gray-300 text-xs">Analyze strengths & weaknesses</p>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
                
                <button className="text-gray-300 hover:text-white transition-all duration-200 hover:scale-105">
                  Contact sales
                </button>
              </nav>
            </div>

            {/* Auth Buttons on Right */}
            <div className="flex items-center gap-4 mr-4">
              <SignedOut>
                <button className="text-gray-300 hover:text-white transition-all duration-200 font-medium hover:scale-105">
                  Login
                </button>
                <SignInButton mode="modal">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 border border-blue-500/50">
                    Sign Up
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-32 pb-24">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight transition-all duration-500 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:via-cyan-400 hover:to-blue-400 hover:scale-105 cursor-pointer">
            AI-Powered Brainstorming & Idea Generation
          </h1>
          
          <p className="text-sm md:text-base text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Run creative sessions, visualize idea diversity, collaborate in real-time, and gamify your
            creativity with our comprehensive brainstorming platform.
          </p>

          {/* CTA Button */}
          <div className="flex justify-center mb-12">
            <button className="bg-white hover:bg-gray-100 text-black px-8 py-3 rounded-xl font-semibold text-base transition-all duration-300 transform hover:scale-105">
              Start Brainstorming
            </button>
          </div>

          {/* AI Input Section (Chat Box) */}
          <div className="max-w-[90%] mx-auto mt-8">
            <div className="bg-black/80 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-4 shadow-2xl shadow-blue-500/20 transition-all duration-500">
              <div className="mb-3">
                <textarea
                  rows="3"
                  placeholder="Create a presentation outlining project goals, challenges, and success metrics..."
                  className="w-full bg-gray-900/50 border-2 border-blue-500/30 hover:border-blue-500/50 focus:border-blue-500 rounded-xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none transition-all duration-300 text-base backdrop-blur-sm resize-none"
                />
              </div>

              <div className="flex justify-end">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold text-base transition-all duration-300 transform hover:scale-105 shadow-xl shadow-blue-500/30 border border-blue-500/50">
                  Fine Tune
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Explore Our Features
          </h2>
          <p className="text-gray-400 text-base">
            Powerful tools to supercharge your brainstorming sessions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {/* Diversity Meter Card */}
          <a href="/diversity-meter" className="group relative bg-gradient-to-br from-blue-900/20 to-blue-950/20 border border-blue-500/30 rounded-2xl p-6 hover:border-blue-500/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
            <div className="absolute top-5 right-5">
              <span className="bg-blue-500/20 text-blue-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-500/30">
                Product
              </span>
            </div>
            <div className="mb-4">
              <div className="w-14 h-14 bg-blue-600/20 rounded-xl flex items-center justify-center border border-blue-500/30 group-hover:bg-blue-600/30 transition-all">
                <span className="text-3xl">🎯</span>
              </div>
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Diversity Meter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Track and measure the creative variety in your brainstorming sessions
            </p>
            <div className="flex items-center text-blue-400 text-base font-semibold">
              View Details <span className="ml-1">→</span>
            </div>
          </a>

          {/* Idea Variation Generator Card */}
          <a href="/idea-variation-generator" className="group relative bg-gradient-to-br from-blue-900/20 to-blue-950/20 border border-blue-500/30 rounded-2xl p-6 hover:border-blue-500/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
            <div className="absolute top-5 right-5">
              <span className="bg-blue-500/20 text-blue-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-500/30">
                Product
              </span>
            </div>
            <div className="mb-4">
              <div className="w-14 h-14 bg-blue-600/20 rounded-xl flex items-center justify-center border border-blue-500/30 group-hover:bg-blue-600/30 transition-all">
                <span className="text-3xl">💡</span>
              </div>
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Idea Variation Generator</h3>
            <p className="text-gray-400 text-sm mb-4">
              Generate diverse variations of your ideas with AI-powered creativity
            </p>
            <div className="flex items-center text-blue-400 text-base font-semibold">
              View Details <span className="ml-1">→</span>
            </div>
          </a>

          {/* Gamified Collaboration Card */}
          <a href="/gamified-collaboration" className="group relative bg-gradient-to-br from-blue-900/20 to-blue-950/20 border border-blue-500/30 rounded-2xl p-6 hover:border-blue-500/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
            <div className="absolute top-5 right-5">
              <span className="bg-blue-500/20 text-blue-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-500/30">
                Product
              </span>
            </div>
            <div className="mb-4">
              <div className="w-14 h-14 bg-blue-600/20 rounded-xl flex items-center justify-center border border-blue-500/30 group-hover:bg-blue-600/30 transition-all">
                <span className="text-3xl">🏆</span>
              </div>
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Gamified Collaboration</h3>
            <p className="text-gray-400 text-sm mb-4">
              Motivate your team with achievements, leaderboards, and rewards
            </p>
            <div className="flex items-center text-blue-400 text-base font-semibold">
              View Details <span className="ml-1">→</span>
            </div>
          </a>

          {/* MindMap Visualization Card */}
          <a href="/mindmap-visualization" className="group relative bg-gradient-to-br from-green-900/20 to-green-950/20 border border-green-500/30 rounded-2xl p-6 hover:border-green-500/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20">
            <div className="absolute top-5 right-5">
              <span className="bg-green-500/20 text-green-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-green-500/30">
                Solution
              </span>
            </div>
            <div className="mb-4">
              <div className="w-14 h-14 bg-green-600/20 rounded-xl flex items-center justify-center border border-green-500/30 group-hover:bg-green-600/30 transition-all">
                <span className="text-3xl">🗺️</span>
              </div>
            </div>
            <h3 className="text-white font-bold text-lg mb-2">MindMap Visualization</h3>
            <p className="text-gray-400 text-sm mb-4">
              Transform your ideas into interactive visual maps
            </p>
            <div className="flex items-center text-green-400 text-base font-semibold">
              View Details <span className="ml-1">→</span>
            </div>
          </a>

          {/* SWOT Evaluation Card */}
          <a href="/swot-evaluation" className="group relative bg-gradient-to-br from-green-900/20 to-green-950/20 border border-green-500/30 rounded-2xl p-6 hover:border-green-500/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20">
            <div className="absolute top-5 right-5">
              <span className="bg-green-500/20 text-green-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-green-500/30">
                Solution
              </span>
            </div>
            <div className="mb-4">
              <div className="w-14 h-14 bg-green-600/20 rounded-xl flex items-center justify-center border border-green-500/30 group-hover:bg-green-600/30 transition-all">
                <span className="text-3xl">📊</span>
              </div>
            </div>
            <h3 className="text-white font-bold text-lg mb-2">SWOT Evaluation</h3>
            <p className="text-gray-400 text-sm mb-4">
              Analyze strengths, weaknesses, opportunities, and threats
            </p>
            <div className="flex items-center text-green-400 text-base font-semibold">
              View Details <span className="ml-1">→</span>
            </div>
          </a>
        </div>
      </section>

      {/* Testimonials & Ratings Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What Our Users Say
          </h2>
          <p className="text-gray-400 text-base">
            Trusted by innovative teams worldwide
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-5xl mx-auto">
          <div className="bg-black/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6 text-center hover:border-blue-500/60 transition-all duration-300">
            <div className="text-4xl font-bold text-blue-400 mb-2">4.9</div>
            <div className="flex justify-center mb-2">
              <span className="text-yellow-400 text-xl">★★★★★</span>
            </div>
            <div className="text-gray-400 text-sm">Average Rating</div>
          </div>
          
          <div className="bg-black/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6 text-center hover:border-blue-500/60 transition-all duration-300">
            <div className="text-4xl font-bold text-blue-400 mb-2">10K+</div>
            <div className="text-gray-400 text-sm">Active Users</div>
          </div>
          
          <div className="bg-black/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6 text-center hover:border-blue-500/60 transition-all duration-300">
            <div className="text-4xl font-bold text-blue-400 mb-2">50K+</div>
            <div className="text-gray-400 text-sm">Ideas Generated</div>
          </div>
          
          <div className="bg-black/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6 text-center hover:border-blue-500/60 transition-all duration-300">
            <div className="text-4xl font-bold text-blue-400 mb-2">98%</div>
            <div className="text-gray-400 text-sm">Satisfaction Rate</div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Testimonial 1 */}
          <div className="bg-gradient-to-br from-blue-900/20 to-blue-950/20 border border-blue-500/30 rounded-2xl p-6 hover:border-blue-500/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-blue-600/30 rounded-full flex items-center justify-center text-white font-bold text-sm border border-blue-500/50">
                SM
              </div>
              <div className="ml-2">
                <h4 className="text-white font-semibold text-xs">Sarah Mitchell</h4>
                <p className="text-gray-400 text-[10px]">Product Manager, TechCorp</p>
              </div>
            </div>
            <div className="flex mb-2">
              <span className="text-yellow-400 text-sm">★★★★★</span>
            </div>
            <p className="text-gray-300 text-xs leading-relaxed">
              "Kaleidoscope Cypher transformed our brainstorming sessions. The Diversity Meter helped us break out of conventional thinking patterns and explore truly innovative solutions."
            </p>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-gradient-to-br from-blue-900/20 to-blue-950/20 border border-blue-500/30 rounded-2xl p-6 hover:border-blue-500/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-blue-600/30 rounded-full flex items-center justify-center text-white font-bold text-sm border border-blue-500/50">
                JC
              </div>
              <div className="ml-2">
                <h4 className="text-white font-semibold text-xs">James Chen</h4>
                <p className="text-gray-400 text-[10px]">Creative Director, DesignHub</p>
              </div>
            </div>
            <div className="flex mb-2">
              <span className="text-yellow-400 text-sm">★★★★★</span>
            </div>
            <p className="text-gray-300 text-xs leading-relaxed">
              "The Idea Variation Generator is a game-changer. It takes our initial concepts and creates variations we never would have thought of. Absolutely brilliant!"
            </p>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-gradient-to-br from-blue-900/20 to-blue-950/20 border border-blue-500/30 rounded-2xl p-6 hover:border-blue-500/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-blue-600/30 rounded-full flex items-center justify-center text-white font-bold text-sm border border-blue-500/50">
                EP
              </div>
              <div className="ml-2">
                <h4 className="text-white font-semibold text-xs">Emily Parker</h4>
                <p className="text-gray-400 text-[10px]">CEO, StartupLabs</p>
              </div>
            </div>
            <div className="flex mb-2">
              <span className="text-yellow-400 text-sm">★★★★★</span>
            </div>
            <p className="text-gray-300 text-xs leading-relaxed">
              "Gamified collaboration features boosted our team's engagement by 300%. Everyone loves competing on the leaderboard while contributing creative ideas."
            </p>
          </div>

          {/* Testimonial 4 */}
          <div className="bg-gradient-to-br from-blue-900/20 to-blue-950/20 border border-blue-500/30 rounded-xl p-4 hover:border-blue-500/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-blue-600/30 rounded-full flex items-center justify-center text-white font-bold text-sm border border-blue-500/50">
                MR
              </div>
              <div className="ml-2">
                <h4 className="text-white font-semibold text-xs">Michael Rodriguez</h4>
                <p className="text-gray-400 text-[10px]">Innovation Lead, GlobalTech</p>
              </div>
            </div>
            <div className="flex mb-2">
              <span className="text-yellow-400 text-sm">★★★★★</span>
            </div>
            <p className="text-gray-300 text-xs leading-relaxed">
              "The MindMap Visualization tool makes complex idea relationships crystal clear. It's become an essential part of our strategic planning process."
            </p>
          </div>

          {/* Testimonial 5 */}
          <div className="bg-gradient-to-br from-blue-900/20 to-blue-950/20 border border-blue-500/30 rounded-xl p-4 hover:border-blue-500/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-blue-600/30 rounded-full flex items-center justify-center text-white font-bold text-sm border border-blue-500/50">
                LT
              </div>
              <div className="ml-2">
                <h4 className="text-white font-semibold text-xs">Lisa Thompson</h4>
                <p className="text-gray-400 text-[10px]">Strategy Consultant, BizAdvisors</p>
              </div>
            </div>
            <div className="flex mb-2">
              <span className="text-yellow-400 text-sm">★★★★★</span>
            </div>
            <p className="text-gray-300 text-xs leading-relaxed">
              "SWOT Evaluation feature streamlined our strategic analysis. What used to take days now takes hours, with better insights and clearer action items."
            </p>
          </div>

          {/* Testimonial 6 */}
          <div className="bg-gradient-to-br from-blue-900/20 to-blue-950/20 border border-blue-500/30 rounded-xl p-4 hover:border-blue-500/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-blue-600/30 rounded-full flex items-center justify-center text-white font-bold text-sm border border-blue-500/50">
                DK
              </div>
              <div className="ml-2">
                <h4 className="text-white font-semibold text-xs">David Kim</h4>
                <p className="text-gray-400 text-[10px]">R&D Director, InnovateCo</p>
              </div>
            </div>
            <div className="flex mb-2">
              <span className="text-yellow-400 text-sm">★★★★★</span>
            </div>
            <p className="text-gray-300 text-xs leading-relaxed">
              "Best brainstorming platform we've used. The AI-powered features are incredibly intuitive and the real-time collaboration is seamless. Highly recommended!"
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-900/30 to-blue-950/30 border border-blue-500/30 rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Transform Your Brainstorming?
            </h3>
            <p className="text-gray-400 text-base mb-6">
              Join thousands of teams already using Kaleidoscope Cypher to unlock their creative potential
            </p>
            <button className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-200 transition-all duration-300 hover:scale-105 shadow-lg">
              Start Brainstorming Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-blue-500/30 bg-black/50 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
            {/* Logo and Description */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <img 
                  src="/logo.png" 
                  alt="Kaleidoscope Logo" 
                  className="h-20 w-auto object-contain"
                />
              </div>
              <p className="text-gray-400 text-base leading-relaxed mb-6 max-w-sm">
                AI-powered brainstorming and idea generation platform. Transform your creative sessions with real-time collaboration and intelligent insights.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 bg-gray-800/50 hover:bg-blue-600 border border-blue-500/30 hover:border-blue-500 rounded-full flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-110">
                  <span className="text-xl">𝕏</span>
                </a>
                <a href="#" className="w-12 h-12 bg-gray-800/50 hover:bg-blue-600 border border-blue-500/30 hover:border-blue-500 rounded-full flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-110">
                  <span className="text-xl">in</span>
                </a>
                <a href="#" className="w-12 h-12 bg-gray-800/50 hover:bg-blue-600 border border-blue-500/30 hover:border-blue-500 rounded-full flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-110">
                  <span className="text-xl">f</span>
                </a>
                <a href="#" className="w-12 h-12 bg-gray-800/50 hover:bg-blue-600 border border-blue-500/30 hover:border-blue-500 rounded-full flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-110">
                  <span className="text-xl">▶</span>
                </a>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="text-white font-semibold mb-5 text-base uppercase tracking-wider">Product</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-white text-base transition-colors duration-200 hover:translate-x-1 inline-block">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-base transition-colors duration-200 hover:translate-x-1 inline-block">Integrations</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-base transition-colors duration-200 hover:translate-x-1 inline-block">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-base transition-colors duration-200 hover:translate-x-1 inline-block">Changelog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-base transition-colors duration-200 hover:translate-x-1 inline-block">Documentation</a></li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-white font-semibold mb-5 text-base uppercase tracking-wider">Company</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-white text-base transition-colors duration-200 hover:translate-x-1 inline-block">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-base transition-colors duration-200 hover:translate-x-1 inline-block">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-base transition-colors duration-200 hover:translate-x-1 inline-block">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-base transition-colors duration-200 hover:translate-x-1 inline-block">Press Kit</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-base transition-colors duration-200 hover:translate-x-1 inline-block">Contact</a></li>
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h4 className="text-white font-semibold mb-5 text-base uppercase tracking-wider">Resources</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-white text-base transition-colors duration-200 hover:translate-x-1 inline-block">Community</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-base transition-colors duration-200 hover:translate-x-1 inline-block">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-base transition-colors duration-200 hover:translate-x-1 inline-block">Partners</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-base transition-colors duration-200 hover:translate-x-1 inline-block">Status</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-base transition-colors duration-200 hover:translate-x-1 inline-block">API</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm">
                © 2025 Kaleidoscope. All rights reserved.
              </p>
              <div className="flex gap-6">
                <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors duration-200">Privacy Policy</a>
                <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors duration-200">Terms of Service</a>
                <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors duration-200">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default LandingPage;
