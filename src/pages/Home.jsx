import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SearchForm from '../components/SearchForm';
import MovieCard from '../components/MovieCard';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  const fetchTrendingMovies = async () => {
    try {
      // Using a demo API key - in production, this should be in environment variables
      const API_KEY = 'b7cd3340a794e5a2f35e3abb820b497f';
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`
      );
      const data = await response.json();
      setTrendingMovies(data.results?.slice(0, 12) || []);
    } catch (error) {
      console.error('Error fetching trending movies:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="hero-logo">
            <h1 className="hero-logo-text">MOVIES</h1>
          </div>
          
          <h1 className="hero-title">Unlimited Movies</h1>
          <p className="hero-subtitle">
            Watch anywhere. Cancel anytime. Ready to watch? Enter a movie name to get started.
          </p>
          
          <div className="search-container">
            <SearchForm />
          </div>
        </motion.div>
      </section>

      {/* Trending Movies Section */}
      <section className="content-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Trending Now</h2>
            <p className="section-subtitle">
              Discover the most popular movies everyone's talking about
            </p>
          </motion.div>
          
          {loading ? (
            <div className="loading">Loading trending movies...</div>
          ) : (
            <motion.div 
              className="movie-grid"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, staggerChildren: 0.1 }}
              viewport={{ once: true }}
            >
              {trendingMovies.map((movie) => (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <MovieCard movie={movie} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;