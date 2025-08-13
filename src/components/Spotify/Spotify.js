import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaSpotify, FaPlay, FaPause, FaExternalLinkAlt } from 'react-icons/fa';
import SidebarNav from '../SidebarNav';
import spotifyApi from '../../services/spotifyApi';

function Spotify() {
  const [recentTracks, setRecentTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [backendConnected, setBackendConnected] = useState(false);

  useEffect(() => {
    const initializeSpotify = async () => {
      try {
        // Check if backend is available
        const isHealthy = await spotifyApi.checkBackendHealth();
        setBackendConnected(isHealthy);
        
        if (isHealthy) {
          await fetchSpotifyData();
        } else {
          setError('Spotify service is currently unavailable');
        }
      } catch (error) {
        console.error('Error initializing Spotify:', error);
        setError('Failed to connect to Spotify service');
        setBackendConnected(false);
      } finally {
        setLoading(false);
      }
    };

    initializeSpotify();
    
    // Set up auto-refresh every 2 minutes
    const interval = setInterval(() => {
      if (backendConnected) {
        fetchSpotifyData();
      }
    }, 120000); // 2 minutes

    return () => clearInterval(interval);
  }, [backendConnected]);

  const fetchSpotifyData = async () => {
    try {
      setLoading(true);
      const data = await spotifyApi.getAllData();
      
      setRecentTracks(data.recentTracks || []);
      setCurrentTrack(data.currentTrack);
      setLastUpdated(data.lastUpdated);
      setError(null);
      setBackendConnected(true);
    } catch (error) {
      console.error('Error fetching Spotify data:', error);
      setError('Failed to fetch music data');
      setBackendConnected(false);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    try {
      await spotifyApi.refreshData();
      await fetchSpotifyData();
    } catch (error) {
      console.error('Error triggering refresh:', error);
      setError('Failed to refresh data');
    }
  };

  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, '0')}`;
  };

  const formatPlayedAt = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else {
      return `${diffDays}d ago`;
    }
  };

  if (loading) {
    return (
      <>
        <SidebarNav />
        <Container fluid className="spotify-section">
          <Container>
            <div className="text-center">
              <h2>Loading Spotify data...</h2>
            </div>
          </Container>
        </Container>
      </>
    );
  }

  if (!backendConnected && !loading) {
    return (
      <>
        <SidebarNav />
        <Container fluid className="spotify-section">
          <Container>
            <Row className="justify-content-center">
              <Col md={6} className="text-center">
                <div className="spotify-login-card">
                  <FaSpotify size={80} className="spotify-icon mb-4" />
                  <h2 className="mb-3">Spotify Service Unavailable</h2>
                  <p className="mb-4">
                    The Spotify service is currently unavailable. Please try again later.
                  </p>
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}
                  <Button 
                    onClick={() => window.location.reload()}
                    className="spotify-login-btn"
                    size="lg"
                  >
                    <FaSpotify className="me-2" />
                    Try Again
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </Container>
      </>
    );
  }

  return (
    <>
      <SidebarNav />
      <Container fluid className="spotify-section">
        <Container>
          <Row className="mb-4">
            <Col>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h1 className="spotify-title">
                    <FaSpotify className="me-2" />
                    My Music
                  </h1>
                  {lastUpdated && (
                    <p className="spotify-subtitle">
                      Last updated: {new Date(lastUpdated).toLocaleString()}
                    </p>
                  )}
                </div>
                <div>
                  <Button 
                    variant="outline-light" 
                    onClick={handleRefresh}
                    className="me-2"
                    disabled={loading}
                  >
                    {loading ? 'Refreshing...' : 'Refresh'}
                  </Button>
                  <div className={`status-indicator ${backendConnected ? 'connected' : 'disconnected'}`}>
                    {backendConnected ? '● Online' : '● Offline'}
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          {currentTrack && currentTrack.item && (
            <Row className="mb-4">
              <Col>
                <Card className="current-track-card">
                  <Card.Body>
                    <div className="d-flex align-items-center">
                      <img 
                        src={currentTrack.item.album.images[0]?.url} 
                        alt={currentTrack.item.album.name}
                        className="current-track-image me-3"
                      />
                      <div className="flex-grow-1">
                        <h5 className="mb-1">
                          {currentTrack.is_playing ? <FaPlay className="me-2" /> : <FaPause className="me-2" />}
                          Currently {currentTrack.is_playing ? 'Playing' : 'Paused'}
                        </h5>
                        <h4 className="mb-1">{currentTrack.item.name}</h4>
                        <p className="mb-0 text-muted">
                          {currentTrack.item.artists.map(artist => artist.name).join(', ')} • {currentTrack.item.album.name}
                        </p>
                      </div>
                      <Button 
                        variant="outline-light"
                        href={currentTrack.item.external_urls.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaExternalLinkAlt />
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}

          <Row>
            <Col>
              <h3 className="mb-3">Recently Played</h3>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              
              <div className="recent-tracks-grid">
                {recentTracks.map((item, index) => (
                  <Card key={`${item.track.id}-${item.played_at}`} className="track-card mb-3">
                    <Card.Body>
                      <div className="d-flex align-items-center">
                        <img 
                          src={item.track.album.images[2]?.url || item.track.album.images[0]?.url} 
                          alt={item.track.album.name}
                          className="track-image me-3"
                        />
                        <div className="flex-grow-1">
                          <h6 className="mb-1 track-name">{item.track.name}</h6>
                          <p className="mb-1 track-artist">
                            {item.track.artists.map(artist => artist.name).join(', ')}
                          </p>
                          <small className="text-muted">
                            {item.track.album.name} • {formatDuration(item.track.duration_ms)}
                          </small>
                        </div>
                        <div className="text-end">
                          <small className="text-muted d-block mb-2">
                            {formatPlayedAt(item.played_at)}
                          </small>
                          <Button 
                            size="sm"
                            variant="outline-light"
                            href={item.track.external_urls.spotify}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaExternalLinkAlt />
                          </Button>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}

export default Spotify;