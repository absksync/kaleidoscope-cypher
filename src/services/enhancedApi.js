/**
 * Enhanced API Service for Kaleidoscope Cypher
 * Supports both humanoid_api (MongoDB backend) and kaleidoscope_unified_api (Advanced AI)
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const AI_API_BASE_URL = import.meta.env.VITE_AI_API_URL || 'http://localhost:8001';

class EnhancedApiService {
  // ===== BASIC BACKEND (humanoid_api.py - Port 5000) =====
  
  /**
   * Check backend health status
   */
  static async healthCheck() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/health`);
      return await response.json();
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  }

  /**
   * Submit a new idea
   */
  static async submitIdea(ideaText, username) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/submit_idea`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idea_text: ideaText,
          username: username,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit idea');
      }

      return data;
    } catch (error) {
      console.error('Error submitting idea:', error);
      throw error;
    }
  }

  /**
   * Generate idea variations
   */
  static async generateIdeaVariations(ideaText) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/generate_idea_variations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idea_text: ideaText,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate variations');
      }

      return data;
    } catch (error) {
      console.error('Error generating variations:', error);
      throw error;
    }
  }

  // ===== ADVANCED AI BACKEND (kaleidoscope_unified_api.py - Port 8001) =====

  /**
   * Check AI system health
   */
  static async checkAISystem() {
    try {
      const response = await fetch(`${AI_API_BASE_URL}/`);
      return await response.json();
    } catch (error) {
      console.error('AI system check failed:', error);
      return null;
    }
  }

  /**
   * Chat with KAI (Kaleidoscope AI)
   * Conversational interface for idea exploration
   */
  static async chatWithKAI(message, userId = 'anonymous_user') {
    try {
      const response = await fetch(`${AI_API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          user_id: userId,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to chat with KAI');
      }

      return data;
    } catch (error) {
      console.error('Error chatting with KAI:', error);
      throw error;
    }
  }

  /**
   * Submit idea to AI system for advanced analysis
   */
  static async submitIdeaToAI(ideaText, userId = 'api_user') {
    try {
      const response = await fetch(`${AI_API_BASE_URL}/submit_idea`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idea_text: ideaText,
          user_id: userId,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit idea to AI');
      }

      return data;
    } catch (error) {
      console.error('Error submitting idea to AI:', error);
      throw error;
    }
  }

  /**
   * Get idea combinations between two ideas
   */
  static async getIdeaCombinations(idea1Id, idea2Id) {
    try {
      const response = await fetch(`${AI_API_BASE_URL}/get_combinations/${idea1Id}/${idea2Id}`);
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get combinations');
      }

      return data;
    } catch (error) {
      console.error('Error getting combinations:', error);
      throw error;
    }
  }

  /**
   * Analyze diversity of a specific idea
   */
  static async analyzeDiversity(ideaId) {
    try {
      const response = await fetch(`${AI_API_BASE_URL}/analyze_diversity/${ideaId}`);
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze diversity');
      }

      return data;
    } catch (error) {
      console.error('Error analyzing diversity:', error);
      throw error;
    }
  }

  /**
   * Get conversation history for a user
   */
  static async getConversationHistory(userId) {
    try {
      const response = await fetch(`${AI_API_BASE_URL}/conversation_history/${userId}`);
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get conversation history');
      }

      return data;
    } catch (error) {
      console.error('Error getting conversation history:', error);
      throw error;
    }
  }

  /**
   * Reset conversation history for a user
   */
  static async resetConversation(userId) {
    try {
      const response = await fetch(`${AI_API_BASE_URL}/reset_conversation/${userId}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to reset conversation');
      }

      return data;
    } catch (error) {
      console.error('Error resetting conversation:', error);
      throw error;
    }
  }

  /**
   * Get system statistics
   */
  static async getSystemStats() {
    try {
      const response = await fetch(`${AI_API_BASE_URL}/system_stats`);
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get system stats');
      }

      return data;
    } catch (error) {
      console.error('Error getting system stats:', error);
      throw error;
    }
  }

  /**
   * Analyze idea with SWOT framework
   */
  static async analyzeSWOT(ideaText) {
    try {
      const response = await fetch(`${AI_API_BASE_URL}/analyze_swot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idea_text: ideaText,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze SWOT');
      }

      return data;
    } catch (error) {
      console.error('Error analyzing SWOT:', error);
      throw error;
    }
  }

  /**
   * Get all ideas from AI backend
   */
  static async getIdeas() {
    try {
      const response = await fetch(`${AI_API_BASE_URL}/ideas`);
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get ideas');
      }

      return data;
    } catch (error) {
      console.error('Error getting ideas:', error);
      throw error;
    }
  }

  /**
   * Generate Socratic questions for an idea (AI Backend)
   */
  static async generateSocraticQuestions(ideaText, numQuestions = 3) {
    try {
      const response = await fetch(`${AI_API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Generate ${numQuestions} Socratic questions for this idea: ${ideaText}`,
          user_id: 'api_user',
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate questions');
      }

      return data;
    } catch (error) {
      console.error('Error generating Socratic questions:', error);
      throw error;
    }
  }

  /**
   * Get real-time active users count (Basic Backend - MongoDB)
   */
  static async getActiveUsers() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/health`);
      const data = await response.json();
      return data.active_users || 0;
    } catch (error) {
      console.error('Error getting active users:', error);
      return 0;
    }
  }

  /**
   * Submit idea to basic backend (MongoDB persistence)
   */
  static async submitIdeaToMongoDB(ideaText, username) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/submit_idea`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idea_text: ideaText,
          username: username,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit idea');
      }

      return data;
    } catch (error) {
      console.error('Error submitting idea to MongoDB:', error);
      throw error;
    }
  }

  // ===== UTILITY METHODS =====

  /**
   * Check if both backends are available
   */
  static async checkAllSystems() {
    const [basic, ai] = await Promise.allSettled([
      this.healthCheck(),
      this.checkAISystem(),
    ]);

    return {
      basicBackend: {
        available: basic.status === 'fulfilled',
        data: basic.status === 'fulfilled' ? basic.value : null,
        error: basic.status === 'rejected' ? basic.reason : null,
      },
      aiBackend: {
        available: ai.status === 'fulfilled',
        data: ai.status === 'fulfilled' ? ai.value : null,
        error: ai.status === 'rejected' ? ai.reason : null,
      },
    };
  }
}

export default EnhancedApiService;
