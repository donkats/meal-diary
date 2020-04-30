import React, { useState } from 'react';
import ResultList from './ResultList';
import '../styles/Popup.css';

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
  const { meal, date, hidePopup, userId } = props;
  const [results, updateResults] = useState({});
  
  return (
    <div className="popup" id={props.meal}>
      <div className="popup-inner">
        <input type="image" src="https://img.icons8.com/ios-filled/26/000000/delete-sign.png" alt="close"
        className="close-popup" onClick={() => hidePopup()} />
        <div className="popup-content">
          <h2>Add to <strong>{props.meal}</strong>:</h2>
          <div className="search-container">
            <input type="search" id={`search${meal}`} className="searchbar" placeholder="search..." 
            onKeyUp={(event) => fetchData(updateResults, meal, event)}/>
            <input type="image" className="search-icon" 
              src="https://img.icons8.com/ios-filled/24/000000/search.png" alt="search icon"
              onClick={(event) => fetchData(updateResults, meal, event)} />
          </div>
          {Object.entries(results).length ? 
            <div>
              <ResultList list={results.common} meal={meal} date={date} userId={userId} type="common" />
              <ResultList list={results.branded} meal={meal} date={date} userId={userId} type="branded" />
            </div>
            : ''}
        </div>
      </div>
    </div>
  );
}

export default Popup;
