import { useState, useEffect, useRef } from 'react';

export const useProgressiveLoading = (images, batchSize = 6) => {
  const [visibleImages, setVisibleImages] = useState([]);
  const [currentBatch, setCurrentBatch] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (images.length === 0) return;
    
    // Load initial batch
    const initialBatch = images.slice(0, batchSize);
    setVisibleImages(initialBatch);
    setCurrentBatch(1);
    setHasMore(images.length > batchSize);
  }, [images, batchSize]);

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore) {
          loadNextBatch();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '200px'
      }
    );

    observerRef.current = observer;

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, currentBatch, images]);

  const loadNextBatch = () => {
    const startIndex = currentBatch * batchSize;
    const endIndex = startIndex + batchSize;
    const nextBatch = images.slice(startIndex, endIndex);

    if (nextBatch.length > 0) {
      setVisibleImages(prev => [...prev, ...nextBatch]);
      setCurrentBatch(prev => prev + 1);
      
      if (endIndex >= images.length) {
        setHasMore(false);
      }
    } else {
      setHasMore(false);
    }
  };

  return {
    visibleImages,
    hasMore,
    sentinelRef,
    loadNextBatch
  };
};

export const useLazyImage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.dataset.src;
          
          if (src) {
            const imageLoader = new Image();
            imageLoader.onload = () => {
              img.src = src;
              img.removeAttribute('data-src');
              setIsLoaded(true);
            };
            imageLoader.onerror = () => {
              setError(true);
            };
            imageLoader.src = src;
          }
          
          observer.unobserve(img);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return { imgRef, isLoaded, error };
};