import React, { useState } from 'react';
import ResultList from './ResultList';

function hidePopup(meal) {
  document.getElementById(meal).classList.add('hidden');
}

function fetchData(updateResults, meal, event) {
  const input = document.getElementById(`search${meal}`);
  const query = input.value.trim();

  if ((event.type === 'click' || event.keyCode === 13) && query !== '') {
    fetch(`/search/${query}`)
      .then((data) => data.json())
      .then((res) => updateResults(res));
    input.value = '';
  }
}

function Popup(props) {
  const { meal, hidePopup, closePopup } = props;
  const [results, updateResults] = useState({});
  return (
    <div className="popup hidden" id={props.meal}>
      <div className="popup-inner">
        <span className="close-popup" onClick={() => hidePopup(meal, closePopup)}>&times;</span>
        <div className="popup-content">
          <div className="search-container">
            <input type="search" id={`search${meal}`} className="searchbar" placeholder="search..." 
            onKeyUp={(event) => fetchData(updateResults, meal, event)}/>
            <input type="image" className="search-icon" 
              src="https://img.icons8.com/ios-filled/24/000000/search.png" alt="search icon"
              onClick={(event) => fetchData(updateResults, meal, event)} />
          </div>
          {Object.entries(results).length ? 
            <div className="results">
              <ResultList list={results.common} meal={meal} type="common" />
              <ResultList list={results.branded} meal={meal} type="branded" />
            </div>
            : ''}
        </div>
      </div>
    </div>
  );
}

export default Popup;
