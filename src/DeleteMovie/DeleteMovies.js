import axios from 'axios';

const deleteMovie = async (movieName) => {
  try {

    const endpoint = `http://localhost:5000/delete?movieName=${encodeURIComponent(movieName)}`;

    const response = await axios.delete(endpoint);

    // Handle the response as needed
    console.log('Delete successful:', response.data);
  } catch (error) {
    // Handle errors
    console.error('Error deleting movie:', error.message);
  }
};

export default deleteMovie;
