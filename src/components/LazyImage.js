import React, { useState, useRef, useEffect } from 'react';

const LazyImage = ({ src, alt, className, style }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          const img = entry.target;
          const imageSrc = img.dataset.src;
          
          if (imageSrc) {
            const imageLoader = new Image();
            imageLoader.onload = () => {
              img.src = imageSrc;
              img.removeAttribute('data-src');
              setIsLoaded(true);
            };
            imageLoader.onerror = () => {
              setError(true);
            };
            imageLoader.src = imageSrc;
          }
          
          observer.unobserve(img);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (error) {
    return (
      <div 
        className={className} 
        style={{ 
          ...style, 
          backgroundColor: '#f0f0f0', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: '#999',
          minHeight: '200px'
        }}
      >
        Failed to load image
      </div>
    );
  }

  return (
    <img
      ref={imgRef}
      data-src={src}
      alt={alt}
      className={`${className} ${isLoaded ? 'loaded' : 'loading'}`}
      style={{
        ...style,
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
        backgroundColor: isLoaded ? 'transparent' : '#f0f0f0'
      }}
    />
  );
};

export default LazyImage;