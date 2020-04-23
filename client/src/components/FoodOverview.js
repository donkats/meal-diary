import React from 'react';
import Popup from './Popup';

function showPopup(meal) {
  document.getElementById(meal).classList.remove('hidden');
}

function FoodOverview() {
  return (
    <div className="overview-box">
      <h3>Breakfast</h3>
      <div className="breakfast">
        <button className="add-btn" onClick={() => showPopup("breakfast")}>+ add breakfast</button>
        <Popup meal="breakfast"/>
      </div>
      <h3>Lunch</h3>
      <div className="lunch">
        <button className="add-btn" onClick={() => showPopup("lunch")}> + add lunch</button>
        <Popup meal="lunch"/>
      </div>
      <h3>Dinner</h3>
      <div className="dinner">
        <button className="add-btn" onClick={() => showPopup("dinner")}>+ add dinner</button>
        <Popup meal="dinner"/>
      </div>
    </div>
  );
}

export default FoodOverview;