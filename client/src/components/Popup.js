import React from 'react';

function hidePopup() {
  document.querySelector('.popup').classList.add('hidden');
}

function Popup() {
  return (
    <div className="popup hidden">
      <div className="popup-inner">
        <span className="close-popup" onClick={() => hidePopup()}>&times;</span>
        <div className="popup-content">
          I AM A POP UP!!!
        </div>
      </div>
    </div>
  );
}

export default Popup;