// Spotify API service for fetching data from backend
class SpotifyAPI {
  constructor() {
    // Use your backend URL - change this to your deployed backend URL
    this.backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';
  }

  // Fetch data from backend API
  async fetchFromBackend(endpoint) {
    try {
      const response = await fetch(`${this.backendUrl}/api/spotify${endpoint}`);
      
      if (!response.ok) {
        throw new Error(`Backend request failed: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching from backend:', error);
      throw error;
    }
  }

  // Get recently played tracks from backend
  async getRecentlyPlayed() {
    try {
      const data = await this.fetchFromBackend('/recent');
      return data.tracks || [];
    } catch (error) {
      console.error('Error fetching recently played tracks:', error);
      throw error;
    }
  }

  // Get currently playing track from backend
  async getCurrentlyPlaying() {
    try {
      const data = await this.fetchFromBackend('/current');
      return data.track;
    } catch (error) {
      console.error('Error fetching currently playing track:', error);
      return null;
    }
  }

  // Get all data from backend
  async getAllData() {
    try {
      const data = await this.fetchFromBackend('/all');
      return data;
    } catch (error) {
      console.error('Error fetching all data:', error);
      throw error;
    }
  }

  // Trigger manual refresh on backend
  async refreshData() {
    try {
      const response = await fetch(`${this.backendUrl}/api/spotify/refresh`, {
        method: 'POST'
      });
      
      if (!response.ok) {
        throw new Error('Failed to refresh data');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error refreshing data:', error);
      throw error;
    }
  }

  // Check if backend is available
  async checkBackendHealth() {
    try {
      const response = await fetch(`${this.backendUrl}/health`);
      return response.ok;
    } catch (error) {
      console.error('Backend health check failed:', error);
      return false;
    }
  }

  // These methods are kept for compatibility but return true since no auth needed
  isAuthenticated() {
    return true; // Always authenticated since backend handles auth
  }

  login() {
    // No login needed on frontend
    return;
  }

  logout() {
    // No logout needed on frontend
    return;
  }
}

// Create singleton instance
const spotifyApi = new SpotifyAPI();
export default spotifyApi;