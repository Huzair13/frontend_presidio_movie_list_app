import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieData: [],
    };

    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.movies !== this.props.movies) {
      this.fetchMovieData();
    }
  }

  handleDelete = async (movieName) => {
    try {
      const action= window.confirm("Are you sure to delete?");
      if(action){
        const endpoint = `http://localhost:5000/delete?movieName=${encodeURIComponent(
        movieName
      )}`;
        console.log('DELETE endpoint:', endpoint);
        const response = await axios.delete(endpoint);
        console.log('DELETE response:', response);
        console.log('Delete successful:', response.data);
        window.location.reload();
      }
      else{
        console.log("Deletion cancelled");
      }
      
    } catch (error) {
      console.error('Error deleting movie:', error.message);
    }
  };

  componentDidMount() {
    this.fetchMovieData();
  }

  fetchMovieData = async () => {
    const { movies } = this.props;
    const apiKey = '5aefe5fe';
    const baseUrl = 'http://www.omdbapi.com/';
  
    const moviePosters = await Promise.all(
      movies.map(async (movie) => {
        try {
          const response = await axios.get(
            `${baseUrl}?apikey=${apiKey}&t=${encodeURIComponent(movie)}&type=movie`
          );
  
          const data = response.data;
  
          if (data && data.Title && data.Type === 'movie') {
            return {
              name: movie,
              poster: data.Poster,
            };
          } else {
            return {
              name: movie,
              poster: null,
            };
          }
        } catch (error) {
          console.error(`Error fetching data for ${movie}`, error);
          return null;
        }
      })
    );
  
    const movieResults = moviePosters.filter(
      (movie) => movie !== null && typeof movie.name === 'string'
    );
    this.setState({ movieData: movieResults });
  };
  

  render() {
    const { movieData } = this.state;

    return (
      <div className="container mt-5">
        <div className="row">
          {movieData
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((movie, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card">
                  {movie.poster ? (
                    <img
                      src={movie.poster}
                      className="card-img-top"
                      alt={`${movie.name} Poster`}
                      style={{ height: '500px' }}
                    />
                  ) : (
                    <div className="no-poster">
                      <p>No Image Found</p>
                    </div>
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{movie.name}</h5>
                    <button
                      style={{ marginRight: '8px' }}
                      className="btn btn-danger"
                      onClick={() => this.handleDelete(movie.name)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default MovieList;
