const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage (use a database for production)
let spotifyData = {
  recentTracks: [],
  currentTrack: null,
  lastUpdated: null
};

// Spotify API configuration
const SPOTIFY_CONFIG = {
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  refreshToken: process.env.SPOTIFY_REFRESH_TOKEN, // You'll need to get this once
  baseUrl: 'https://api.spotify.com/v1'
};

let accessToken = null;
let tokenExpiry = null;

// Function to get access token using refresh token
async function refreshAccessToken() {
  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', 
      new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: SPOTIFY_CONFIG.refreshToken,
        client_id: SPOTIFY_CONFIG.clientId,
        client_secret: SPOTIFY_CONFIG.clientSecret
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    accessToken = response.data.access_token;
    tokenExpiry = Date.now() + (response.data.expires_in * 1000);
    
    console.log('Access token refreshed successfully');
    return accessToken;
  } catch (error) {
    console.error('Error refreshing access token:', error.response?.data || error.message);
    throw error;
  }
}

// Function to ensure we have a valid access token
async function ensureValidToken() {
  if (!accessToken || Date.now() >= tokenExpiry) {
    await refreshAccessToken();
  }
  return accessToken;
}

// Function to make authenticated Spotify API requests
async function makeSpotifyRequest(endpoint) {
  try {
    const token = await ensureValidToken();
    const response = await axios.get(`${SPOTIFY_CONFIG.baseUrl}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error making Spotify request to ${endpoint}:`, error.response?.data || error.message);
    throw error;
  }
}

// Function to fetch recent tracks
async function fetchRecentTracks() {
  try {
    const data = await makeSpotifyRequest('/me/player/recently-played?limit=20');
    return data.items || [];
  } catch (error) {
    console.error('Error fetching recent tracks:', error);
    return [];
  }
}

// Function to fetch currently playing track
async function fetchCurrentTrack() {
  try {
    const data = await makeSpotifyRequest('/me/player/currently-playing');
    return data;
  } catch (error) {
    console.error('Error fetching current track:', error);
    return null;
  }
}

// Function to update all Spotify data
async function updateSpotifyData() {
  try {
    console.log('Updating Spotify data...');
    
    const [recentTracks, currentTrack] = await Promise.all([
      fetchRecentTracks(),
      fetchCurrentTrack()
    ]);

    spotifyData = {
      recentTracks,
      currentTrack,
      lastUpdated: new Date().toISOString()
    };

    console.log(`Updated Spotify data: ${recentTracks.length} recent tracks`);
  } catch (error) {
    console.error('Error updating Spotify data:', error);
  }
}

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Spotify Backend API',
    lastUpdated: spotifyData.lastUpdated,
    tracksCount: spotifyData.recentTracks.length
  });
});

app.get('/api/spotify/recent', (req, res) => {
  res.json({
    tracks: spotifyData.recentTracks,
    lastUpdated: spotifyData.lastUpdated
  });
});

app.get('/api/spotify/current', (req, res) => {
  res.json({
    track: spotifyData.currentTrack,
    lastUpdated: spotifyData.lastUpdated
  });
});

app.get('/api/spotify/all', (req, res) => {
  res.json(spotifyData);
});

// Manual refresh endpoint (useful for testing)
app.post('/api/spotify/refresh', async (req, res) => {
  try {
    await updateSpotifyData();
    res.json({ 
      message: 'Data refreshed successfully',
      data: spotifyData
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to refresh data',
      message: error.message
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Initialize data and start cron job
async function initialize() {
  try {
    // Update data immediately on startup
    await updateSpotifyData();
    
    // Schedule updates every 5 minutes
    cron.schedule('*/5 * * * *', updateSpotifyData);
    console.log('Scheduled data updates every 5 minutes');
    
  } catch (error) {
    console.error('Failed to initialize:', error);
  }
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  initialize();
});