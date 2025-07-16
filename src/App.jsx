import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MotionDiv, fadeIn } from './utils/motion';
import Header from './components/Header';
import './App.css';

// Lazy load components for better performance
const Home = React.lazy(() => import('./pages/Home'));
const SearchResults = React.lazy(() => import('./pages/SearchResults'));
const MovieDetail = React.lazy(() => import('./pages/MovieDetail'));
const WatchMovie = React.lazy(() => import('./pages/WatchMovie'));

// Loading component for suspense fallback
const Loading = () => (
  <div className="loading-container">
    <div className="loading-spinner"></div>
    <p>Loading...</p>
  </div>
);

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <MotionDiv
          {...fadeIn}
        >
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
              <Route path="/watch/:id" element={<WatchMovie />} />
            </Routes>
          </Suspense>
        </MotionDiv>
      </div>
    </Router>
  );
}

export default App;