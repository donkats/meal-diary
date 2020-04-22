import React, { useState } from 'react';
import ResultList from './ResultList';

function hidePopup() {
  document.querySelector('.popup').classList.add('hidden');
}

function fetchData(updateResults) {
  const input = document.querySelector('.searchbar');
  const query = input.value.trim();

  if (query !== '') {
    console.log('fetching:', query);
    fetch(`/search/${query}`)
      .then((data) => data.json())
      .then((res) => updateResults(res));
    input.value = '';
  }
}

function Popup() {
  const [results, updateResults] = useState({});

  return (
    <div className="popup hidden">
      <div className="popup-inner">
        <span className="close-popup" onClick={() => hidePopup()}>&times;</span>
        <div className="popup-content">
          <div className="search-container">
            <input type="search" className="searchbar" placeholder="search..." />
            <input type="image" className="search-icon" 
              src="https://img.icons8.com/ios-filled/24/000000/search.png" alt="search icon"
              onClick={() => fetchData(updateResults)} />
          </div>
          {Object.entries(results).length ? 
            <div className="results">
              <ResultList list={results.common} type="common" />
              <ResultList list={results.branded} type="branded" />
            </div>
            : ''}
        </div>
      </div>
    </div>
  );
}

export default Popup;