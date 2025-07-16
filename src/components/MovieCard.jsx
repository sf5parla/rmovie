import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Eye } from 'lucide-react';

const MovieCard = ({ movie }) => {
  const title = movie.title.length > 20 ? movie.title.substring(0, 20) + '...' : movie.title;
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/300x450/333/fff?text=No+Image';

  return (
    <motion.div 
      className="movie-card"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="movie-poster">
        <img src={posterUrl} alt={movie.title} loading="lazy" />
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
    </motion.div>
  );
};

export default MovieCard;