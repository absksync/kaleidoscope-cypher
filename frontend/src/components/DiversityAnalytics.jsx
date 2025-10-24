import React, { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Lightbulb } from 'lucide-react';
import useStore from '../store';

const DiversityAnalytics = () => {
  const diversityScore = useStore((state) => state.diversityScore);
  const categoryDistribution = useStore((state) => state.categoryDistribution);
  const ideas = useStore((state) => state.ideas);
  const updateDiversityMetrics = useStore((state) => state.updateDiversityMetrics);

  useEffect(() => {
    // Fetch diversity metrics from backend
    const fetchMetrics = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/diversity');
        if (response.ok) {
          const data = await response.json();
          updateDiversityMetrics(data);
        }
      } catch (error) {
        console.error('Error fetching diversity metrics:', error);
      }
    };

    if (ideas.length > 0) {
      fetchMetrics();
    }
  }, [ideas.length]);

  const categoryData = Object.entries(categoryDistribution).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = ['#0ea5e9', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

  const getDiversityLevel = (score) => {
    if (score >= 80) return { label: 'Excellent', color: 'text-green-600', bg: 'bg-green-100' };
    if (score >= 60) return { label: 'Good', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (score >= 40) return { label: 'Moderate', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { label: 'Low', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const level = getDiversityLevel(diversityScore);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <TrendingUp className="text-primary-500" />
        Diversity Analytics
      </h2>

      {/* Diversity Score */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-semibold">Idea Diversity Score</span>
          <span className={`text-2xl font-bold ${level.color}`}>
            {diversityScore.toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className={`h-4 rounded-full transition-all duration-500 ${
              diversityScore >= 80 ? 'bg-green-500' :
              diversityScore >= 60 ? 'bg-blue-500' :
              diversityScore >= 40 ? 'bg-yellow-500' :
              'bg-red-500'
            }`}
            style={{ width: `${diversityScore}%` }}
          />
        </div>
        <div className={`mt-2 inline-block px-3 py-1 rounded-full text-sm font-medium ${level.bg} ${level.color}`}>
          {level.label} Diversity
        </div>
      </div>

      {/* Category Distribution */}
      {categoryData.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Lightbulb size={20} className="text-primary-500" />
            Category Distribution
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Bar Chart */}
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} fontSize={12} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#0ea5e9" />
              </BarChart>
            </ResponsiveContainer>

            {/* Pie Chart */}
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="bg-primary-50 p-3 rounded-lg text-center">
          <div className="text-2xl font-bold text-primary-600">{ideas.length}</div>
          <div className="text-sm text-gray-600">Total Ideas</div>
        </div>
        <div className="bg-purple-50 p-3 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-600">{Object.keys(categoryDistribution).length}</div>
          <div className="text-sm text-gray-600">Categories</div>
        </div>
        <div className="bg-green-50 p-3 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">
            {ideas.length > 0 ? Math.floor(diversityScore / 10) : 0}
          </div>
          <div className="text-sm text-gray-600">Diversity Level</div>
        </div>
      </div>
    </div>
  );
};

export default DiversityAnalytics;
