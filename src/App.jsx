import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import MovieDetail from './pages/MovieDetail';
import WatchMovie from './pages/WatchMovie';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/watch/:id" element={<WatchMovie />} />
          </Routes>
        </motion.main>
      </div>
    </Router>
  );
}

export default App;