import React from 'react';
import Popup from './Popup';

function showPopup() {
  document.querySelector('.popup').classList.remove('hidden');
}

function FoodOverview() {
  return (
    <div className="overview-box">
      <h3>Breakfast</h3>
      <div className="breakfast">
        <button className="add-btn" onClick={() => showPopup()}>+ add breakfast</button>
      </div>
      <h3>Lunch</h3>
      <div className="lunch">
        <button className="add-btn" onClick={() => showPopup()}> + add lunch</button>
      </div>
      <h3>Dinner</h3>
      <div className="dinner">
      <button className="add-btn" onClick={() => showPopup()}>+ add dinner</button>
      </div>
      <Popup />
    </div>
  );
}

export default FoodOverview;