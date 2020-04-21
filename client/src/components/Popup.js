import React from 'react';

function hidePopup() {
  document.querySelector('.popup').classList.add('hidden');
}

function searchClick() {
  const content = document.querySelector('.searchbar').value;
  console.log('search bar content:', content);
  if (content.trim() != '') {
    // make fetch request here
  }
}

function Popup() {
  return (
    <div className="popup">
      <div className="popup-inner">
        <span className="close-popup" onClick={() => hidePopup()}>&times;</span>
        <div className="popup-content">
          <h3>Search for product:</h3>
          <div className="search-container">
            <input type="search" className="searchbar" placeholder="search..." />
            <input type="image" className="search-icon" 
              src="https://img.icons8.com/ios-filled/24/000000/search.png" alt="search icon"
              onClick={() => searchClick()} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;