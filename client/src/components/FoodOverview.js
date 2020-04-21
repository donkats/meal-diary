import React from 'react';

function FoodOverview() {
  return (
    <div className="overview-box">
      <h3>Breakfast</h3>
      <div className="breakfast"></div>
      <h3>Lunch</h3>
      <div className="lunch"></div>
      <h3>Dinner</h3>
      <div className="dinner"></div>
      <div className="add-btn-box">
        <button className="add-btn">add food</button>
      </div>
    </div>
  );
}

export default FoodOverview;