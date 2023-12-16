import React, { useState, useEffect } from 'react';
import MovieList from './MovieList/MovieListFile';
import Search from './SearchMovie/searchMovie';
import Filter from './FilterMovie/Filter';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MovieForm from './AddMovie/AddMovieForm';
import UpdateMovieForm from './UpdateMovie/UpdateMovie';
import './CustomStyles/styles.css';
import AppNavbar from './NavBar/Navbar';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    const endpoint = 'http://localhost:5000/';
    fetchMovies(endpoint);
  }, []);

  const fetchMovies = async (endpoint) => {
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      setMovies(data);
      setFilteredMovies(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setLoading(false);
    }
  };

  const handleFilterChange = async ({ filterBy, value }) => {
    try {
      const endpoint = `http://localhost:5000/filterName?${encodeURIComponent(filterBy)}=${encodeURIComponent(value)}`;
      const response = await fetch(endpoint);
      const filteredData = await response.json();
      setFilteredMovies(filteredData);
    } catch (error) {
      console.error('Error fetching filtered movies:', error);
    }
  };

  const headingStyle = {
    fontFamily: 'Georgia, serif',
    fontSize: '2rem',
    fontWeight: 'bold',
    color: 'Maroon',
  };

  const footerStyle = {
    marginTop: '20px', 
    textAlign: 'center',
  };

  return (
    <Router>
      <div className="app-container">
        <AppNavbar />
        <Routes>
          <Route path="/add-movie" element={<MovieForm />} />
          <Route path='/update-movie' element={<UpdateMovieForm />} />
          <Route
            path="/"
            element={(
              <>
                <Search />
                <Filter onFilterChange={handleFilterChange} movies={movies} setFilteredMovies={setFilteredMovies} />
                {loading ? (
                  <p className="text-center">Loading...</p>
                ) : (
                  <MovieList movies={filteredMovies} />
                )}
              </>
            )}
          />
        </Routes>
        <div className="custom-dark-olive" style={footerStyle}>
          <p className='title'>Contact Details:</p>
          <p className='label_color'>Email: ahamedhuzair13@gmail.com</p>
          <p className='label_color'>Phone: 9677381857</p>
        </div>
      </div>
    </Router>
  );
};

export default App;
