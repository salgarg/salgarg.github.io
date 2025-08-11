import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

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

  return (
    <Container fluid className="digitalart-container">
      <div className="art-grid">
        {artworks.map(([, src], index) => (
          <div key={index} className="art-item">
            <img 
              src={src.default || src} 
              alt={`Digital Art ${index + 1}`}
              className="art-image"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </Container>
  );
}

export default DigitalArtGallery;
