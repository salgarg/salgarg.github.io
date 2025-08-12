import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import SidebarNav from "../SidebarNav";
import LazyImage from "../LazyImage";
import { useProgressiveLoading } from "../../hooks/useProgressiveLoading";

function Photography() {
  const [photos, setPhotos] = useState([]);

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
      require.context('../../Assets/PhotographyPhotos', false, /\.(png|jpe?g|JPG)$/)
    );
    
    const photoEntries = Object.entries(images);
    const shuffledPhotos = shuffleArray(photoEntries);
    setPhotos(shuffledPhotos);
  }, []);

  const { visibleImages, hasMore, sentinelRef } = useProgressiveLoading(photos, 8);

  return (
    <>
      <SidebarNav />
      <Container fluid className="photography-container">
        <div className="photo-grid">
          {visibleImages.map(([, src], index) => (
            <div key={index} className="photo-item">
              <LazyImage 
                src={src.default || src} 
                alt={`Photography ${index + 1}`}
                className="photo-image"
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
              Loading more photos...
            </div>
          )}
        </div>
      </Container>
    </>
  );
}

export default Photography;
