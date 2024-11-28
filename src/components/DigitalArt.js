import React from 'react';

const DigitalArt = () => {
    const artworks = [
        { src: '${process.env.PUBLIC_URL}/assets/digital-art/art1.PNG', alt: 'Art 1' },
        { src: '${process.env.PUBLIC_URL}/assets/digital-art/art2.PNG', alt: 'Art 2' },
      ];

  return (
    <section style={{ padding: '2rem' }}>
      <h1>Digital Art</h1>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {artworks.map((art, index) => (
          <img key={index} src={art.src} alt={art.alt} style={{ maxWidth: '300px', borderRadius: '8px' }} />
        ))}
      </div>
    </section>
  );
};

export default DigitalArt;
