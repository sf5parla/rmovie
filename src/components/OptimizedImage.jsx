import React, { useState, useRef, useEffect } from 'react';

const OptimizedImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  className = '', 
  placeholder = 'https://via.placeholder.com/300x450/333/fff?text=Loading...',
  onLoad,
  onError 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Generate WebP URL if supported
  const getOptimizedSrc = (originalSrc) => {
    if (originalSrc.includes('tmdb.org')) {
      // For TMDB images, use smaller size variants
      return originalSrc.replace('/w500', '/w342');
    }
    return originalSrc;
  };

  return (
    <div 
      ref={imgRef}
      className={`optimized-image-container ${className}`}
      style={{ 
        width, 
        height, 
        backgroundColor: '#333',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Placeholder */}
      {!isLoaded && !hasError && (
        <div 
          className="image-placeholder"
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#333',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#666',
            fontSize: '12px'
          }}
        >
          {isInView ? 'Loading...' : ''}
        </div>
      )}
      
      {/* Actual image */}
      {isInView && !hasError && (
        <img
          src={getOptimizedSrc(src)}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}
        />
      )}
      
      {/* Error fallback */}
      {hasError && (
        <div 
          className="image-error"
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#333',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#666',
            fontSize: '12px'
          }}
        >
          Failed to load image
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;