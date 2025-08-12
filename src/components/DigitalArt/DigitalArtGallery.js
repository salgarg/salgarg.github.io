import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import SidebarNav from "../SidebarNav";
import LazyImage from "../LazyImage";
import { useProgressiveLoading } from "../../hooks/useProgressiveLoading";

function DigitalArtGallery() {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    const importAll = (r) => {
      let images = {};
      r.keys().map((item) => {
        images[item.replace('./', '')] = r(item);
      });
      return images;
    };

    const shuffleArray = (array) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    const images = importAll(
      require.context('../../Assets/DigitalArtFiles', false, /\.(png|jpe?g|JPG|PNG)$/)
    );
    
    const artworkEntries = Object.entries(images);
    const shuffledArtworks = shuffleArray(artworkEntries);
    setArtworks(shuffledArtworks);
  }, []);

  const { visibleImages, hasMore, sentinelRef } = useProgressiveLoading(artworks, 8);

  return (
    <>
      <SidebarNav />
      <Container fluid className="digitalart-container">
        <div className="art-grid">
          {visibleImages.map(([, src], index) => (
            <div key={index} className="art-item">
              <LazyImage 
                src={src.default || src} 
                alt={`Digital Art ${index + 1}`}
                className="art-image"
              />
            </div>
          ))}
          {hasMore && (
            <div 
              ref={sentinelRef} 
              style={{ 
                height: '20px', 
                width: '100%', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                color: 'white',
                fontSize: '0.9em',
                opacity: 0.7,
                gridColumn: '1 / -1'
              }}
            >
              Loading more artworks...
            </div>
          )}
        </div>
      </Container>
    </>
  );
}

export default DigitalArtGallery;
