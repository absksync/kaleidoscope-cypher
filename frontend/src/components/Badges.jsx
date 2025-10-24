import React from 'react';
import { Award, Star, Zap, Target, TrendingUp, Users } from 'lucide-react';
import useStore from '../store';

const Badges = () => {
  const currentUser = useStore((state) => state.currentUser);
  const ideas = useStore((state) => state.ideas);
  const diversityScore = useStore((state) => state.diversityScore);

  const userIdeas = ideas.filter(idea => idea.userId === currentUser.id);

  const badges = [
    {
      id: 'first-idea',
      name: 'First Steps',
      description: 'Submit your first idea',
      icon: Star,
      earned: userIdeas.length >= 1,
      color: 'text-yellow-500',
      bg: 'bg-yellow-100',
    },
    {
      id: 'idea-machine',
      name: 'Idea Machine',
      description: 'Submit 10 ideas',
      icon: Zap,
      earned: userIdeas.length >= 10,
      color: 'text-purple-500',
      bg: 'bg-purple-100',
    },
    {
      id: 'diversity-champion',
      name: 'Diversity Champion',
      description: 'Achieve 80% diversity score',
      icon: TrendingUp,
      earned: diversityScore >= 80,
      color: 'text-green-500',
      bg: 'bg-green-100',
    },
    {
      id: 'category-explorer',
      name: 'Category Explorer',
      description: 'Submit ideas in 3+ categories',
      icon: Target,
      earned: new Set(userIdeas.map(i => i.category)).size >= 3,
      color: 'text-blue-500',
      bg: 'bg-blue-100',
    },
    {
      id: 'points-collector',
      name: 'Points Collector',
      description: 'Earn 100 points',
      icon: Award,
      earned: currentUser.points >= 100,
      color: 'text-orange-500',
      bg: 'bg-orange-100',
    },
    {
      id: 'team-player',
      name: 'Team Player',
      description: 'Collaborate with 5+ team members',
      icon: Users,
      earned: false, // This would be calculated based on actual collaboration metrics
      color: 'text-pink-500',
      bg: 'bg-pink-100',
    },
  ];

  const earnedBadges = badges.filter(b => b.earned);
  const lockedBadges = badges.filter(b => !b.earned);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Award className="text-primary-500" />
        Your Badges
      </h2>

      {/* Progress */}
      <div className="mb-6 p-4 bg-gradient-to-r from-primary-50 to-purple-50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-gray-800">Badge Progress</span>
          <span className="text-primary-600 font-bold">
            {earnedBadges.length} / {badges.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-primary-500 to-purple-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${(earnedBadges.length / badges.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Earned Badges */}
      {earnedBadges.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Earned Badges</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {earnedBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.id}
                  className={`p-4 rounded-lg border-2 ${badge.bg} border-current hover:shadow-lg transition-all cursor-pointer`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`${badge.color} mb-2`}>
                      <Icon size={32} />
                    </div>
                    <h4 className="font-bold text-sm text-gray-800 mb-1">{badge.name}</h4>
                    <p className="text-xs text-gray-600">{badge.description}</p>
                    <div className="mt-2">
                      <span className="inline-block px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                        ✓ Earned
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Locked Badges */}
      {lockedBadges.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Locked Badges</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {lockedBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.id}
                  className="p-4 rounded-lg border-2 border-gray-200 bg-gray-50 opacity-60 hover:opacity-80 transition-opacity"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="text-gray-400 mb-2">
                      <Icon size={32} />
                    </div>
                    <h4 className="font-bold text-sm text-gray-600 mb-1">{badge.name}</h4>
                    <p className="text-xs text-gray-500">{badge.description}</p>
                    <div className="mt-2">
                      <span className="inline-block px-2 py-1 bg-gray-300 text-gray-600 text-xs rounded-full">
                        🔒 Locked
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Badges;
