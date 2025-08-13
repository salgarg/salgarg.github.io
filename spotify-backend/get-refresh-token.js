// One-time script to get refresh token
// Run this once to get your refresh token, then save it to your .env file

const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 8888;

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = `http://localhost:${PORT}/callback`;
const SCOPES = [
  'user-read-recently-played',
  'user-read-currently-playing',
  'user-top-read'
].join(' ');

app.get('/login', (req, res) => {
  const authUrl = 'https://accounts.spotify.com/authorize?' +
    new URLSearchParams({
      response_type: 'code',
      client_id: CLIENT_ID,
      scope: SCOPES,
      redirect_uri: REDIRECT_URI,
      show_dialog: true
    }).toString();
  
  res.redirect(authUrl);
});

app.get('/callback', async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send('Authorization code not provided');
  }

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', 
      new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    const { access_token, refresh_token, expires_in } = response.data;

    console.log('\\n=== SUCCESS! ===');
    console.log('Access Token:', access_token);
    console.log('Refresh Token:', refresh_token);
    console.log('Expires in:', expires_in, 'seconds');
    console.log('\\nSave this refresh token to your .env file:');
    console.log(`SPOTIFY_REFRESH_TOKEN=${refresh_token}`);
    console.log('\\n===============');

    res.send(`
      <h1>Success!</h1>
      <p>Check your console for the refresh token.</p>
      <p>Save this refresh token to your .env file:</p>
      <code>SPOTIFY_REFRESH_TOKEN=${refresh_token}</code>
      <p>You can now close this window and stop the server (Ctrl+C).</p>
    `);

    // Auto-close after showing the token
    setTimeout(() => {
      console.log('\\nClosing server...');
      process.exit(0);
    }, 5000);

  } catch (error) {
    console.error('Error exchanging code for tokens:', error.response?.data || error.message);
    res.status(500).send('Error getting tokens');
  }
});

app.get('/', (req, res) => {
  res.send(`
    <h1>Spotify Refresh Token Generator</h1>
    <p>Click the link below to authorize with Spotify:</p>
    <a href="/login">Login with Spotify</a>
  `);
});

app.listen(PORT, () => {
  console.log('\\n=== Spotify Refresh Token Generator ===');
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('Go to http://localhost:${PORT} to start the authorization process');
  console.log('=======================================\\n');
});