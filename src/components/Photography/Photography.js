import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import SidebarNav from "../SidebarNav";

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

  return (
    <>
      <SidebarNav />
      <Container fluid className="photography-container">
      <div className="photo-grid">
        {photos.map(([, src], index) => (
          <div key={index} className="photo-item">
            <img 
              src={src.default || src} 
              alt={`Photography ${index + 1}`}
              className="photo-image"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </Container>
    </>
  );
}

export default Photography;
