import React from 'react';

const Photography = () => {
    const photos = [
        { src: '${process.env.PUBLIC_URL}/assets/photography/photo1.jpeg', alt: 'Photo 1' },
        { src: '${process.env.PUBLIC_URL}/assets/photography/photo2.jpeg', alt: 'Photo 2' },
      ];

  return (
    <section style={{ padding: '2rem' }}>
      <h1>Photography</h1>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {photos.map((photo, index) => (
          <img key={index} src={photo.src} alt={photo.alt} style={{ maxWidth: '300px', borderRadius: '8px' }} />
        ))}
      </div>
    </section>
  );
};

export default Photography;
