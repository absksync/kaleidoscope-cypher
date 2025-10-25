import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

const GamifiedCollaboration = () => {
  const { user } = useUser();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('overview'); // overview, submit, leaderboard, achievements
  const [newIdea, setNewIdea] = useState('');
  const [userPoints, setUserPoints] = useState(1250);
  const [userRank, setUserRank] = useState(3);
  const [streak, setStreak] = useState(7);
  const [submitting, setSubmitting] = useState(false);
  const [recentActivity, setRecentActivity] = useState([]);
  const [teamIdeas, setTeamIdeas] = useState([]);
  
  // Initialize with dummy data
  useEffect(() => {
    // Simulate real-time activity feed
    const activities = [
      { id: 1, user: 'Sarah Chen', action: 'submitted an idea', points: 50, time: '2 min ago', idea: 'AI-powered smart city traffic optimization' },
      { id: 2, user: 'Alex Kumar', action: 'earned a badge', points: 100, time: '5 min ago', badge: 'Innovation Master' },
      { id: 3, user: 'You', action: 'voted on an idea', points: 10, time: '8 min ago' },
      { id: 4, user: 'Jamie Lee', action: 'completed a challenge', points: 200, time: '12 min ago', challenge: 'Week Warrior' },
      { id: 5, user: 'Morgan Davis', action: 'submitted an idea', points: 50, time: '15 min ago', idea: 'Blockchain-based voting system' },
    ];
    setRecentActivity(activities);
    
    // Team ideas with voting
    const ideas = [
      { id: 1, user: 'Sarah Chen', text: 'AI-powered smart city traffic optimization using real-time data', votes: 24, diversity: 0.85, trending: true, category: 'Technology' },
      { id: 2, user: 'Alex Kumar', text: 'Gamified fitness app with AR challenges and social competition', votes: 19, diversity: 0.78, trending: false, category: 'Health' },
      { id: 3, user: 'Jamie Lee', text: 'Sustainable packaging solution using biodegradable materials', votes: 17, diversity: 0.92, trending: true, category: 'Environment' },
      { id: 4, user: 'You', text: 'Virtual reality education platform for remote learning', votes: 15, diversity: 0.76, trending: false, category: 'Education' },
      { id: 5, user: 'Morgan Davis', text: 'Blockchain-based supply chain transparency platform', votes: 12, diversity: 0.88, trending: false, category: 'Business' },
    ];
    setTeamIdeas(ideas);
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      // Randomly update votes
      setTeamIdeas(prev => prev.map(idea => ({
        ...idea,
        votes: idea.votes + (Math.random() > 0.7 ? 1 : 0)
      })));
      
      // Randomly add activity
      if (Math.random() > 0.8) {
        const users = ['Sarah Chen', 'Alex Kumar', 'Jamie Lee', 'Morgan Davis', 'Taylor Swift'];
        const actions = ['submitted an idea', 'voted on an idea', 'earned points'];
        const newActivity = {
          id: Date.now(),
          user: users[Math.floor(Math.random() * users.length)],
          action: actions[Math.floor(Math.random() * actions.length)],
          points: Math.floor(Math.random() * 50) + 10,
          time: 'Just now'
        };
        setRecentActivity(prev => [newActivity, ...prev].slice(0, 10));
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };
  
  const handleSubmitIdea = () => {
    if (!newIdea.trim()) return;
    
    setSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      const points = 50 + Math.floor(Math.random() * 30);
      setUserPoints(prev => prev + points);
      
      // Add to team ideas
      const newIdeaObj = {
        id: Date.now(),
        user: user?.firstName || 'You',
        text: newIdea,
        votes: 1,
        diversity: 0.7 + Math.random() * 0.25,
        trending: true,
        category: 'New'
      };
      setTeamIdeas(prev => [newIdeaObj, ...prev]);
      
      // Add to activity
      setRecentActivity(prev => [{
        id: Date.now(),
        user: 'You',
        action: 'submitted an idea',
        points: points,
        time: 'Just now',
        idea: newIdea
      }, ...prev].slice(0, 10));
      
      setNewIdea('');
      setSubmitting(false);
      setActiveTab('overview');
      
      // Show success notification
      alert(`🎉 Idea submitted! You earned ${points} points!`);
    }, 1000);
  };
  
  const handleVote = (ideaId) => {
    setTeamIdeas(prev => prev.map(idea => 
      idea.id === ideaId ? { ...idea, votes: idea.votes + 1 } : idea
    ));
    setUserPoints(prev => prev + 10);
    
    setRecentActivity(prev => [{
      id: Date.now(),
      user: 'You',
      action: 'voted on an idea',
      points: 10,
      time: 'Just now'
    }, ...prev].slice(0, 10));
  };
  
  const leaderboard = [
    { rank: 1, name: 'Sarah Chen', points: 2450, badge: '🥇', trend: '+150', avatar: 'SC' },
    { rank: 2, name: 'Alex Kumar', points: 1890, badge: '🥈', trend: '+95', avatar: 'AK' },
    { rank: 3, name: user?.firstName || 'You', points: userPoints, badge: '🥉', trend: '+80', avatar: user?.firstName?.charAt(0) || 'Y' },
    { rank: 4, name: 'Jamie Lee', points: 1120, badge: '4', trend: '+65', avatar: 'JL' },
    { rank: 5, name: 'Morgan Davis', points: 980, badge: '5', trend: '+50', avatar: 'MD' },
    { rank: 6, name: 'Taylor Swift', points: 875, badge: '6', trend: '+45', avatar: 'TS' },
    { rank: 7, name: 'Chris Martin', points: 720, badge: '7', trend: '+30', avatar: 'CM' },
  ];
  
  const achievements = [
    { id: 1, name: 'Idea Machine', desc: 'Added 50 ideas', icon: '🎯', points: 100, unlocked: true, progress: '50/50' },
    { id: 2, name: 'Week Warrior', desc: '7-day contribution streak', icon: '🔥', points: 75, unlocked: true, progress: '7/7' },
    { id: 3, name: 'Team Player', desc: 'Collaborated on 10 projects', icon: '🤝', points: 50, unlocked: true, progress: '10/10' },
    { id: 4, name: 'Innovation Master', desc: 'Add 100 ideas', icon: '💎', points: 250, unlocked: false, progress: '50/100' },
    { id: 5, name: 'Diversity Champion', desc: 'Achieve 90% diversity score', icon: '🌈', points: 150, unlocked: false, progress: '75/90' },
    { id: 6, name: 'Vote Master', desc: 'Cast 50 votes', icon: '🗳️', points: 100, unlocked: false, progress: '32/50' },
  ];

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
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">🏆</div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Gamified Collaboration Hub
              </h1>
              <p className="text-sm text-gray-400">
                Compete, collaborate, and earn rewards for your creative contributions
              </p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 backdrop-blur-xl border border-yellow-500/30 rounded-2xl p-5 text-center hover:scale-105 transition-transform cursor-pointer">
                <div className="text-3xl mb-2">⭐</div>
                <div className="text-2xl font-bold text-white mb-1">{userPoints.toLocaleString()}</div>
                <div className="text-xs text-gray-400">Total Points</div>
              </div>
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-5 text-center hover:scale-105 transition-transform cursor-pointer">
                <div className="text-3xl mb-2">🏅</div>
                <div className="text-2xl font-bold text-white mb-1">12</div>
                <div className="text-xs text-gray-400">Badges Earned</div>
              </div>
              <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 backdrop-blur-xl border border-orange-500/30 rounded-2xl p-5 text-center hover:scale-105 transition-transform cursor-pointer">
                <div className="text-3xl mb-2">🔥</div>
                <div className="text-2xl font-bold text-white mb-1">{streak} Days</div>
                <div className="text-xs text-gray-400">Current Streak</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-5 text-center hover:scale-105 transition-transform cursor-pointer">
                <div className="text-3xl mb-2">📊</div>
                <div className="text-2xl font-bold text-white mb-1">#{userRank}</div>
                <div className="text-xs text-gray-400">Team Rank</div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-black/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-2 mb-6">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`flex-1 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                    activeTab === 'overview'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-blue-500/10'
                  }`}
                >
                  📊 Overview
                </button>
                <button
                  onClick={() => setActiveTab('submit')}
                  className={`flex-1 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                    activeTab === 'submit'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-blue-500/10'
                  }`}
                >
                  💡 Submit Idea
                </button>
                <button
                  onClick={() => setActiveTab('leaderboard')}
                  className={`flex-1 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                    activeTab === 'leaderboard'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-blue-500/10'
                  }`}
                >
                  🏆 Leaderboard
                </button>
                <button
                  onClick={() => setActiveTab('achievements')}
                  className={`flex-1 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                    activeTab === 'achievements'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-blue-500/10'
                  }`}
                >
                  🎯 Achievements
                </button>
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="grid md:grid-cols-3 gap-6">
                {/* Team Ideas with Voting */}
                <div className="md:col-span-2 bg-black/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6">
                  <h3 className="text-white text-lg font-semibold mb-4 flex items-center justify-between">
                    <span>🔥 Trending Team Ideas</span>
                    <span className="text-xs text-gray-400">{teamIdeas.length} ideas</span>
                  </h3>
                  <div className="space-y-3 max-h-[600px] overflow-y-auto">
                    {teamIdeas.map((idea) => (
                      <div key={idea.id} className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 hover:border-blue-500/50 transition-all">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-blue-400 text-xs font-semibold">@{idea.user}</span>
                              <span className="text-xs px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded-full">{idea.category}</span>
                              {idea.trending && (
                                <span className="text-xs px-2 py-0.5 bg-orange-500/20 text-orange-300 rounded-full">🔥 Trending</span>
                              )}
                            </div>
                            <p className="text-white text-sm mb-2">{idea.text}</p>
                            <div className="flex items-center gap-4 text-xs">
                              <span className="text-gray-400">Diversity: {(idea.diversity * 100).toFixed(0)}%</span>
                              <span className="text-gray-400">•</span>
                              <span className="text-gray-400">{idea.votes} votes</span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleVote(idea.id)}
                          className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-xs transition-all hover:scale-105"
                        >
                          👍 Vote (+10 points)
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Real-time Activity Feed */}
                <div className="bg-black/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6">
                  <h3 className="text-white text-lg font-semibold mb-4">⚡ Live Activity</h3>
                  <div className="space-y-2 max-h-[600px] overflow-y-auto">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 text-xs">
                        <div className="flex items-start justify-between mb-1">
                          <span className="text-blue-400 font-semibold">{activity.user}</span>
                          <span className="text-gray-500">{activity.time}</span>
                        </div>
                        <p className="text-gray-300 text-xs mb-1">{activity.action}</p>
                        {activity.idea && (
                          <p className="text-gray-400 text-xs italic mb-1">"{activity.idea.slice(0, 40)}..."</p>
                        )}
                        <span className="text-green-400 font-semibold">+{activity.points} pts</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'submit' && (
              <div className="max-w-3xl mx-auto">
                <div className="bg-black/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-8">
                  <h3 className="text-white text-2xl font-bold mb-2">💡 Submit Your Idea</h3>
                  <p className="text-gray-400 text-sm mb-6">Share your creative ideas and earn points!</p>
                  
                  <textarea
                    value={newIdea}
                    onChange={(e) => setNewIdea(e.target.value)}
                    placeholder="Describe your innovative idea here... (e.g., 'A mobile app that uses AI to help people reduce their carbon footprint')"
                    className="w-full bg-black/50 border border-blue-500/30 rounded-xl p-4 text-white text-base resize-none focus:outline-none focus:border-blue-500 transition-colors h-40 mb-4"
                  />
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-gray-400">
                      <span className="font-semibold text-white">{newIdea.length}</span> characters
                    </div>
                    <div className="text-sm text-green-400 font-semibold">
                      Reward: 50-80 points 🎁
                    </div>
                  </div>
                  
                  <button
                    onClick={handleSubmitIdea}
                    disabled={submitting || !newIdea.trim()}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 transform hover:scale-105 shadow-xl shadow-blue-500/30 border border-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {submitting ? '🚀 Submitting...' : '🚀 Submit Idea'}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'leaderboard' && (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-black/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6">
                  <h3 className="text-white text-lg font-semibold mb-4">🏆 Top Contributors</h3>
                  <div className="space-y-3">
                    {leaderboard.map((player) => (
                      <div 
                        key={player.rank}
                        className={`${
                          player.rank <= 3
                            ? 'bg-gradient-to-r from-yellow-500/20 to-transparent border-yellow-500/30'
                            : 'bg-blue-500/10 border-blue-500/20'
                        } border rounded-xl p-4 flex items-center justify-between hover:scale-105 transition-transform`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-blue-600/30 rounded-full flex items-center justify-center text-white font-bold border-2 border-blue-500/50">
                            {player.rank <= 3 ? player.badge : player.avatar}
                          </div>
                          <div>
                            <p className="text-white font-semibold">{player.name}</p>
                            <p className="text-xs text-gray-400">{player.points.toLocaleString()} points</p>
                          </div>
                        </div>
                        <span className={`font-bold ${player.rank <= 3 ? 'text-yellow-400' : 'text-blue-400'}`}>
                          {player.trend}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Active Challenges */}
                <div className="bg-black/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6">
                  <h3 className="text-white text-lg font-semibold mb-4">🎯 Active Challenges</h3>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 rounded-xl p-5">
                      <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                        <span>🚀</span> Innovation Sprint
                      </h4>
                      <p className="text-xs text-gray-400 mb-3">Generate 100 team ideas this week</p>
                      <div className="mb-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-white font-semibold">73/100</span>
                        </div>
                        <div className="w-full h-3 bg-purple-500/20 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500" style={{width: '73%'}}></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-purple-400 font-semibold">⏰ 2 days left</span>
                        <span className="text-green-400 font-semibold">🏆 500 team points</span>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border border-cyan-500/30 rounded-xl p-5">
                      <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                        <span>🌈</span> Diversity Champion
                      </h4>
                      <p className="text-xs text-gray-400 mb-3">Achieve 80% average diversity score</p>
                      <div className="mb-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-400">Current Score</span>
                          <span className="text-white font-semibold">75%</span>
                        </div>
                        <div className="w-full h-3 bg-cyan-500/20 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500" style={{width: '75%'}}></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-cyan-400 font-semibold">⏰ 5 days left</span>
                        <span className="text-green-400 font-semibold">🎖️ Exclusive badge</span>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 rounded-xl p-5">
                      <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                        <span>🔥</span> Streak Master
                      </h4>
                      <p className="text-xs text-gray-400 mb-3">Maintain 14-day contribution streak</p>
                      <div className="mb-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-400">Current Streak</span>
                          <span className="text-white font-semibold">{streak}/14 days</span>
                        </div>
                        <div className="w-full h-3 bg-orange-500/20 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-500" style={{width: `${(streak/14*100)}%`}}></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-orange-400 font-semibold">⏰ 7 days to go</span>
                        <span className="text-green-400 font-semibold">💰 300 points</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`${
                      achievement.unlocked
                        ? 'bg-gradient-to-br from-green-500/20 to-green-600/10 border-green-500/30'
                        : 'bg-gray-700/20 border-gray-600/30 opacity-60'
                    } border rounded-xl p-6 hover:scale-105 transition-transform`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <span className={`text-4xl ${!achievement.unlocked && 'grayscale'}`}>
                        {achievement.icon}
                      </span>
                      <div className="flex-1">
                        <h4 className={`font-semibold mb-1 ${achievement.unlocked ? 'text-white' : 'text-gray-400'}`}>
                          {achievement.name}
                        </h4>
                        <p className={`text-xs ${achievement.unlocked ? 'text-gray-400' : 'text-gray-500'}`}>
                          {achievement.desc}
                        </p>
                      </div>
                    </div>
                    <div className="mb-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span className={achievement.unlocked ? 'text-gray-400' : 'text-gray-500'}>
                          Progress
                        </span>
                        <span className={achievement.unlocked ? 'text-white font-semibold' : 'text-gray-500'}>
                          {achievement.progress}
                        </span>
                      </div>
                      <div className={`w-full h-2 ${achievement.unlocked ? 'bg-green-500/20' : 'bg-gray-600/20'} rounded-full overflow-hidden`}>
                        <div 
                          className={`h-full ${achievement.unlocked ? 'bg-green-500' : 'bg-gray-600'} rounded-full transition-all duration-500`}
                          style={{width: achievement.unlocked ? '100%' : achievement.progress.split('/').reduce((a,b) => (parseInt(a)/parseInt(b)*100) + '%')}}
                        ></div>
                      </div>
                    </div>
                    <div className={`text-xs font-semibold ${achievement.unlocked ? 'text-green-400' : 'text-gray-500'}`}>
                      {achievement.unlocked ? `🎉 Unlocked! +${achievement.points} pts` : `🔒 Locked - ${achievement.points} points`}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamifiedCollaboration;
