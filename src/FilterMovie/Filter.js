import React, { useState } from 'react';

const Filter = ({ onFilterChange }) => {
  const [filter, setFilter] = useState('');
  const [filterBy, setFilterBy] = useState('movieName');

  const handleFilterSubmit = () => {
    if (filter.trim() !== '') {
      onFilterChange({ filterBy, value: filter });
    }
  };

  const handleClearFilter = () => {
    setFilter('');
    onFilterChange({ filterBy: '', value: '' });
  };

  const handleFilterByChange = (e) => {
    const value = e.target.value;
    setFilterBy(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleFilterSubmit();
    }
  };

  return (
    <div className='container mt-4'>
    <div className="mb-3">
      <label htmlFor="filter" className="form-label title">
        Filter Movies:
      </label>
      <div className="input-group mb-3">
        <select
          className="form-select custom-input"
          onChange={handleFilterByChange}
          value={filterBy}
        >
          <option value="movieName">Name</option>
          <option value="director">Director</option>
          <option value="releaseYear">Release Year</option>
          <option value="language">Language</option>
          <option value="rating">Rating</option>
        </select>
        <input
          type="text"
          className="form-control custom-input"
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Enter ${filterBy} to filter`}
        />
        <button className="btn btn-primary" onClick={handleFilterSubmit}>
          Filter
        </button>
        <button className="btn btn-secondary" onClick={handleClearFilter}>
          Clear Filter
        </button>
      </div>
    </div>
    </div>
  );
};

export default Filter;