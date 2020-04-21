import React from 'react';

function hidePopup() {
  document.querySelector('.popup').classList.add('hidden');
}

function searchClick() {
  const input = document.querySelector('.searchbar');
  console.log('search bar content:', input.value);
  if (input.value.trim() !== '') {
    input.value = '';
    // make fetch request here
  }
}

function Popup() {
  return (
    <div className="popup hidden">
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