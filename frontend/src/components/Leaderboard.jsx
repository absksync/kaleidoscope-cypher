import React, { useEffect } from 'react';
import { Trophy, Medal, Award, Crown } from 'lucide-react';
import useStore from '../store';

const Leaderboard = () => {
  const leaderboard = useStore((state) => state.leaderboard);
  const updateLeaderboard = useStore((state) => state.updateLeaderboard);
  const currentUser = useStore((state) => state.currentUser);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/leaderboard');
        if (response.ok) {
          const data = await response.json();
          updateLeaderboard(data);
        }
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };

    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="text-yellow-500" size={24} />;
      case 2:
        return <Medal className="text-gray-400" size={24} />;
      case 3:
        return <Medal className="text-orange-600" size={24} />;
      default:
        return <Award className="text-blue-500" size={20} />;
    }
  };

  const getRankBg = (rank) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-100 to-yellow-50 border-yellow-400';
      case 2:
        return 'bg-gradient-to-r from-gray-100 to-gray-50 border-gray-400';
      case 3:
        return 'bg-gradient-to-r from-orange-100 to-orange-50 border-orange-400';
      default:
        return 'bg-white border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Trophy className="text-primary-500" />
        Leaderboard
      </h2>

      {/* Current User Stats */}
      <div className="mb-6 p-4 bg-primary-50 rounded-lg border-2 border-primary-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Your Points</p>
            <p className="text-2xl font-bold text-primary-600">{currentUser.points}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Your Rank</p>
            <p className="text-2xl font-bold text-primary-600">
              #{leaderboard.findIndex(u => u.id === currentUser.id) + 1 || 'N/A'}
            </p>
          </div>
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="space-y-3">
        {leaderboard.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No data yet. Start submitting ideas!</p>
        ) : (
          leaderboard.map((user, index) => (
            <div
              key={user.id}
              className={`p-4 rounded-lg border-2 transition-all ${getRankBg(index + 1)} ${
                user.id === currentUser.id ? 'ring-2 ring-primary-500' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10">
                    {getRankIcon(index + 1)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {user.name}
                      {user.id === currentUser.id && (
                        <span className="ml-2 text-xs bg-primary-500 text-white px-2 py-1 rounded-full">
                          You
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-gray-600">
                      {user.ideasCount || 0} ideas submitted
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{user.points}</p>
                  <p className="text-xs text-gray-600">points</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Points Legend */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">How to earn points:</h3>
        <div className="space-y-1 text-sm text-gray-600">
          <p>• Submit an idea: <span className="font-semibold text-primary-600">+10 points</span></p>
          <p>• Highly diverse idea: <span className="font-semibold text-primary-600">+20 points</span></p>
          <p>• Unique category: <span className="font-semibold text-primary-600">+15 points</span></p>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
