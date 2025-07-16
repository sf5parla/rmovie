import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Eye } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

const MovieCard = ({ movie }) => {
  const title = movie.title.length > 20 ? movie.title.substring(0, 20) + '...' : movie.title;
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/300x450/333/fff?text=No+Image';

  return (
    <div 
      className="movie-card"
      style={{
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
        e.currentTarget.style.boxShadow = '0 16px 32px rgba(0,0,0,0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';
      }}
    >
      <div className="movie-poster">
        <OptimizedImage 
          src={posterUrl} 
          alt={movie.title}
          width="100%"
          height="100%"
        />
        <div className="movie-overlay">
          <div className="movie-actions">
            <Link to={`/movie/${movie.id}`} className="btn btn-primary">
              <Play size={16} /> Watch Now
            </Link>
          </div>
        </div>
      </div>
      
      <div className="movie-info">
        <h3 className="movie-title">{title}</h3>
        <div className="movie-meta">
          <div className="rating">
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
          </div>
          <span className="availability">Free</span>
        </div>
        <div className="movie-actions">
          <Link to={`/movie/${movie.id}`} className="btn btn-primary">
            <Eye size={16} /> View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;