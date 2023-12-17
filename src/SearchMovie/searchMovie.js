import React, { Component } from "react";
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default class Search extends Component {
  constructor(props) {

    super(props);
    
    this.state = {
      movieName: '',
      res: [],
    }

    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fetchPoster = this.fetchPoster.bind(this);
  }

  handleChange(event) {
    this.setState({ movieName: event.target.value });
  }

  async fetchPoster(movieName) {
    const apiKey = '5aefe5fe';
    const baseUrl = 'https://www.omdbapi.com/';

    try {
      const response = await fetch(`${baseUrl}?apikey=${apiKey}&t=${encodeURIComponent(movieName)}&type=movie`);
      
      if (!response.ok) {
        console.error(`Error fetching data for ${movieName}`);
        return null;
      }

      const data = await response.json();
      return data.Poster;
    } catch (error) {
      console.error('Error fetching poster:', error);
      return null;
    }
  }

  async handleSearch(event) {
    event.preventDefault();
  
    if (!this.state.movieName.trim()) {
      this.setState({ res: [] });
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/search', { movieName: this.state.movieName });
      if (response.data === "Movie Not Found :(") {
        this.setState({ res: [] });
        return;
      }
  
      const moviesWithPosters = [];
  
      for (const movie of response.data) {
        const poster = await this.fetchPoster(movie.movieName);
        moviesWithPosters.push({ ...movie, poster });
      }
  
      if (moviesWithPosters.length === 0) {
        this.setState({ res: [] });
      } else {
        this.setState({ res: moviesWithPosters });
      }
    } catch (error) {
      console.error('Search error:', error);
    }
  }
  

  render() {
    return (
      <div className="container mt-4">
        <form onSubmit={this.handleSearch} className="mb-3">
          <div className="input-group ">
            <input
              type="text"
              name="movieName"
              onChange={this.handleChange}
              className="form-control custom-input"
              placeholder="Enter movie name"
            />
            <div className="input-group-append">
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>
        </form>

        <div className="row justify-content-center">
          {Array.isArray(this.state.res) && this.state.res.map(movie => (
            <div key={movie.id} className="col-md-6 mb-4">
              <div className="card">
                <div className="row no-gutters">
                  <div className="col-md-6">
                    <img src={movie.poster} className="card-img" alt={`${movie.movieName} Poster`} />
                  </div>
                  <div className="col-md-6">
                  <div className="card-body">
                    <h5 className="card-title movie-name">
                      <span style={{ color: '#3498db', fontSize: '1.5em', fontWeight: 'bold' }}>
                        {movie.movieName}
                      </span>
                    </h5>
                    <p className="card-text">Director: {movie.director}</p>
                    <p className="card-text">Release Year: {movie.releaseYear}</p>
                    <p className="card-text">Language: {movie.language}</p>
                    <p className="card-text">Rating: {movie.rating}</p>
                  </div>
                </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
