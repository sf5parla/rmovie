import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Eye, Download } from 'lucide-react';
import VideoModal from '../components/VideoModal';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState([]);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('US');
  const [showTrailer, setShowTrailer] = useState(false);
  const [loading, setLoading] = useState(true);

  const languages = [
    { code: 'US', name: 'English', flag: '🇺🇸' },
    { code: 'ES', name: 'Spanish', flag: '🇪🇸' },
    { code: 'IT', name: 'Italian', flag: '🇮🇹' },
    { code: 'FR', name: 'French', flag: '🇫🇷' },
    { code: 'DE', name: 'German', flag: '🇩🇪' }
  ];

  const downloadQualities = [
    'SD Quality', 'HQ Quality', 'HD Quality', 
    'Full HD Quality', '4K Quality', '8K Quality'
  ];

  useEffect(() => {
    if (id) {
      fetchMovieDetails();
      fetchMovieVideos();
      fetchRelatedMovies();
    }
  }, [id]);

  const fetchMovieDetails = async () => {
    try {
      const API_KEY = 'b7cd3340a794e5a2f35e3abb820b497f';
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
      );
      const data = await response.json();
      setMovie(data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMovieVideos = async () => {
    try {
      const API_KEY = 'b7cd3340a794e5a2f35e3abb820b497f';
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
      );
      const data = await response.json();
      setVideos(data.results || []);
    } catch (error) {
      console.error('Error fetching movie videos:', error);
    }
  };

  const fetchRelatedMovies = async () => {
    try {
      const API_KEY = 'b7cd3340a794e5a2f35e3abb820b497f';
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}`
      );
      const data = await response.json();
      setRelatedMovies(data.results?.slice(0, 6) || []);
    } catch (error) {
      console.error('Error fetching related movies:', error);
    }
  };

  const handleDownload = () => {
    // Simulate CPA offer - in real implementation, this would trigger the CPA system
    alert('Complete the offer to download this movie!');
  };

  const getTrailerKey = () => {
    const trailer = videos.find(video => 
      video.type === 'Trailer' && video.site === 'YouTube'
    );
    return trailer?.key || videos[0]?.key;
  };

  if (loading) {
    return <div className="loading">Loading movie details...</div>;
  }

  if (!movie) {
    return (
      <div className="error">
        <h3>Movie Not Found</h3>
        <p>The requested movie could not be found.</p>
      </div>
    );
  }

  const backdropUrl = movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${movie.backdrop_path}`
    : null;
  
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`
    : 'https://via.placeholder.com/300x450/333/fff?text=No+Image';

  return (
    <div className="movie-detail">
      <div className="movie-hero">
        {backdropUrl && (
          <img 
            src={backdropUrl} 
            alt={movie.title}
            className="movie-backdrop"
          />
        )}
        
        <div className="movie-content">
          <div className="container">
            <motion.div 
              className="movie-details"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="movie-poster-large">
                <img src={posterUrl} alt={movie.title} />
              </div>
              
              <div className="movie-info-large">
                <h1 className="movie-title-large">Watch {movie.title} Online</h1>
                
                <div className="movie-meta mb-3">
                  <div className="rating">
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                  </div>
                  <span className="availability">Available Now</span>
                  <span className="availability" style={{ marginLeft: '1rem' }}>FREE</span>
                </div>

                <div className="language-selector">
                  <h3 className="language-title">Select your Language:</h3>
                  <div className="language-flags">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        className={`flag-btn ${selectedLanguage === lang.code ? 'active' : ''}`}
                        onClick={() => setSelectedLanguage(lang.code)}
                        title={lang.name}
                      >
                        <span style={{ fontSize: '2rem' }}>{lang.flag}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <p className="movie-description">
                  {movie.overview || 'No description available for this movie.'}
                </p>

                <div className="action-buttons">
                  <Link to={`/watch/${movie.id}`} className="btn-watch">
                    <Play size={20} />
                    Watch movie online - {languages.find(l => l.code === selectedLanguage)?.name}
                  </Link>
                  <button 
                    className="btn-trailer"
                    onClick={() => setShowTrailer(true)}
                  >
                    <Eye size={20} />
                    Watch Trailer
                  </button>
                </div>

                <div className="download-section">
                  <h3 className="download-title">
                    Download Links - {languages.find(l => l.code === selectedLanguage)?.name} Language
                  </h3>
                  <div className="download-grid">
                    {downloadQualities.map((quality, index) => (
                      <button
                        key={index}
                        className="download-btn"
                        onClick={handleDownload}
                      >
                        <Download size={16} />
                        {quality} - {languages.find(l => l.code === selectedLanguage)?.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Related Movies */}
      {relatedMovies.length > 0 && (
        <section className="content-section">
          <div className="container">
            <h2 className="section-title">Related Movies</h2>
            <div className="movie-grid">
              {relatedMovies.map((relatedMovie) => (
                <motion.div
                  key={relatedMovie.id}
                  className="movie-card"
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="movie-poster">
                    <img 
                      src={`https://image.tmdb.org/t/p/w220_and_h330_face${relatedMovie.poster_path}`}
                      alt={relatedMovie.title}
                      loading="lazy"
                    />
                  </div>
                  <div className="movie-info">
                    <h3 className="movie-title">
                      {relatedMovie.title.length > 20 
                        ? relatedMovie.title.substring(0, 20) + '...'
                        : relatedMovie.title
                      }
                    </h3>
                    <Link to={`/movie/${relatedMovie.id}`} className="btn btn-primary">
                      <Eye size={16} /> View
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Video Modal */}
      <VideoModal
        isOpen={showTrailer}
        onClose={() => setShowTrailer(false)}
        videoKey={getTrailerKey()}
      />
    </div>
  );
};

export default MovieDetail;