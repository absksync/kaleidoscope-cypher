import { create } from 'zustand';

const useStore = create((set, get) => ({
  // Ideas state
  ideas: [],
  currentUser: { id: 1, name: 'User', points: 0 },
  
  // Diversity metrics
  diversityScore: 0,
  categoryDistribution: {},
  
  // Leaderboard
  leaderboard: [],
  
  // AI Prompts
  aiPrompts: [],
  
  // Add idea
  addIdea: (idea) => set((state) => {
    const newIdea = {
      ...idea,
      id: Date.now(),
      timestamp: new Date().toISOString(),
      userId: state.currentUser.id,
      userName: state.currentUser.name,
    };
    return { ideas: [...state.ideas, newIdea] };
  }),
  
  // Update diversity metrics
  updateDiversityMetrics: (metrics) => set({ 
    diversityScore: metrics.score,
    categoryDistribution: metrics.distribution 
  }),
  
  // Update leaderboard
  updateLeaderboard: (leaderboard) => set({ leaderboard }),
  
  // Update AI prompts
  updateAIPrompts: (prompts) => set({ aiPrompts: prompts }),
  
  // Award points to user
  awardPoints: (points) => set((state) => ({
    currentUser: {
      ...state.currentUser,
      points: state.currentUser.points + points
    }
  })),
  
  // Set ideas (for initial load or reset)
  setIdeas: (ideas) => set({ ideas }),
}));

export default useStore;
