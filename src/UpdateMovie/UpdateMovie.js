import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MovieUpdateForm = () => {
  const [updateData, setUpdateData] = useState({
    movieName:'',
    language: '',
    director: '',
    releaseYear: '',
    rating: '',
  });

  const navigate = useNavigate(); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedMovieData = {};
      for (const key in updateData) {
        if (updateData[key] !== '') {
          updatedMovieData[key] = updateData[key];
        }
      }

      const response = await axios.put(`http://localhost:5000/movies/${updateData.movieName}`, updatedMovieData);
      console.log(response.data);
      navigate('/');

      setTimeout(() => {
        window.location.reload();
        }, 500);

    } catch (error) {
      console.error('Error updating movie:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Update Movie</h2>
      <form onSubmit={handleFormSubmit}>
      <div className="mb-3">
          <label htmlFor="language" className="form-label">
            Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="movieName"
            name="movieName"
            value={updateData.movieName}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="language" className="form-label">
            Language:
          </label>
          <input
            type="text"
            className="form-control"
            id="language"
            name="language"
            value={updateData.language}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="director" className="form-label">
            Director:
          </label>
          <input
            type="text"
            className="form-control"
            id="director"
            name="director"
            value={updateData.director}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="releaseYear" className="form-label">
            Release Year:
          </label>
          <input
            type="number"
            className="form-control"
            id="releaseYear"
            name="releaseYear"
            value={updateData.releaseYear}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="rating" className="form-label">
            Rating:
          </label>
          <input
            type="number"
            className="form-control"
            id="rating"
            name="rating"
            value={updateData.rating}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};

export default MovieUpdateForm;