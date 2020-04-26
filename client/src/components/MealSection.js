import React, { useState, useEffect } from 'react';
import Popup from './Popup';

function MealSection(props) {
  const { meal, userId, date, fetchSum } = props;
  const [meals, updateMeals] = useState([]);

  const totalKcal = meals.length > 0 ? meals.reduce((val, item) => val + item.kcal_intake, 0) : 0;

  function fetchMeals() {
    fetch(`/meals/${userId}/${meal}/${date}`)
        .then((data) => data.json())
        .then((data) => updateMeals(data));
  }

  useEffect(() => {
    fetchMeals();
  }, []);

  const showPopup = (meal) => {
    document.getElementById(meal).classList.remove('hidden');
  }
  
  const hidePopup = (meal) => {
    document.getElementById(meal).classList.add('hidden');
    fetchMeals();
    fetchSum();
  }

  return (
    <div className="meal">
      <h3>{meal.charAt(0).toUpperCase() + meal.slice(1)}</h3>
      {meals.map((item, index) => (
        <div className="meal-item" key={index}>
          {item['food_name']} <span className="kcal">{Math.round(item.kcal_intake)} kcal</span>
          <br /> 
          <span className="meal-item-details">{item.units} x {item.serving_q} {item.serving_unit}</span>
        </div>
      ))}
      <button className="add-btn" onClick={() => showPopup(meal)}>+ add {props.meal}</button>
      <div className="total-kcal">Total: {Math.round(totalKcal)} kcal</div>
      <Popup meal={meal} hidePopup={hidePopup} date={date} />
    </div>
  )
}

export default MealSection;