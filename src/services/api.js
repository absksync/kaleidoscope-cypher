/**
 * API Service for Kaleidoscope Cypher
 * Handles all backend communication
 */

// Use environment variable for API URL, fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (typeof window !== 'undefined' && window.location.hostname === 'localhost' 
    ? 'http://localhost:5000'
    : 'https://kaleidoscope-backend.vercel.app');

class ApiService {
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
   * @param {string} ideaText - The idea text
   * @param {string} username - Username of the submitter
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
   * Generate idea variations using AI creativity techniques
   * @param {string} ideaText - The original idea text
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
}

export default ApiService;
