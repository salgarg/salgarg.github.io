# Spotify Backend Service

This backend service handles Spotify authentication and serves your personal Spotify data to your frontend without requiring user login.

## Setup Instructions

### 1. Get Spotify API Credentials

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app
3. Copy the **Client ID** and **Client Secret**

### 2. Get Refresh Token (One-time setup)

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

3. Add your Spotify credentials to `.env`:
   ```env
   SPOTIFY_CLIENT_ID=your_client_id
   SPOTIFY_CLIENT_SECRET=your_client_secret
   PORT=3001
   ```

4. Run the refresh token generator:
   ```bash
   node get-refresh-token.js
   ```

5. Open your browser to `http://localhost:8888`
6. Click "Login with Spotify" and authorize the app
7. Copy the refresh token and add it to your `.env` file:
   ```env
   SPOTIFY_REFRESH_TOKEN=your_refresh_token_here
   ```

### 3. Run the Backend

```bash
# Development
npm run dev

# Production
npm start
```

The server will run on `http://localhost:3001` by default.

## API Endpoints

- `GET /` - Server status and info
- `GET /api/spotify/recent` - Recently played tracks
- `GET /api/spotify/current` - Currently playing track
- `GET /api/spotify/all` - All Spotify data
- `POST /api/spotify/refresh` - Manually refresh data
- `GET /health` - Health check

## Deployment Options

### Option 1: Railway
1. Connect your GitHub repo to Railway
2. Add environment variables in Railway dashboard
3. Deploy automatically

### Option 2: Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the backend directory
3. Add environment variables via Vercel dashboard

### Option 3: Heroku
1. Create a Heroku app
2. Add environment variables via Heroku CLI or dashboard
3. Deploy with Git

### Option 4: DigitalOcean App Platform
1. Connect GitHub repo
2. Configure environment variables
3. Deploy

## Frontend Configuration

Add to your React app's `.env` file:
```env
REACT_APP_BACKEND_URL=https://your-deployed-backend-url.com
```

For local development:
```env
REACT_APP_BACKEND_URL=http://localhost:3001
```

## Features

- **Automatic token refresh** - No manual intervention needed
- **Data caching** - Stores recent tracks and current playing status
- **Scheduled updates** - Refreshes every 5 minutes automatically
- **CORS enabled** - Works with any frontend domain
- **Health checks** - Monitor service status
- **Error handling** - Graceful fallbacks for API issues

## Security Notes

- Never commit `.env` files
- Use environment variables for all sensitive data
- The refresh token doesn't expire, so keep it secure
- Consider adding rate limiting for production use