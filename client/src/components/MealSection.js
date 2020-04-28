import React, { useState, useEffect, useCallback } from 'react';
import Popup from './Popup';
import '../styles/MealSection.css';

function MealSection(props) {
  const { meal, userId, date, fetchSum } = props;
  const [meals, updateMeals] = useState([]);
  const [isPopupShown, setPopup] = useState(false);

  const totalKcal = meals.length > 0 ? meals.reduce((val, item) => val + item.kcal_intake, 0) : 0;

  const fetchMeals = useCallback(() => {
    fetch(`/meals/${userId}/${meal}/${date}`)
      .then((data) => data.json())
      .then((data) => updateMeals(data));
  }, [userId, meal, date]);

  useEffect(() => {
    if (!isPopupShown) {
      fetchMeals();
      fetchSum();
    }
  }, [isPopupShown, fetchMeals, fetchSum]);

  function showPopup() {
    setPopup(true);
  }
  
  function hidePopup() {
    setPopup(false);
  }

  function deleteItem(mealId) {

    fetch(`/delmeals/${mealId}`, { method: 'DELETE' })
      .then(() => {
        fetchMeals();
        fetchSum();
      });
  }

  return (
    <div className="meal">
      <h3>{meal.charAt(0).toUpperCase() + meal.slice(1)}</h3>
      {meals.map((item) => (
        <div className="item" key={item.id}>
          <div className="meal-item">
            {item.food_name} <span className="kcal">{Math.round(item.kcal_intake)} kcal</span>
            <br /> 
            <span className="meal-item-details">{item.units} x {item.serving_q} {item.serving_unit}</span>
          </div>
          <input type="image" className="remove-btn" 
            src="https://img.icons8.com/ios/50/000000/cancel.png" alt="remove button"
            onClick={() => deleteItem(item.id)}/>
        </div>
      ))}
      <button className="add-btn" onClick={() => showPopup()}>+ add {props.meal}</button>
      <div className="total-kcal">Total: {Math.round(totalKcal)} kcal</div>
      {isPopupShown && <Popup meal={meal} hidePopup={hidePopup} date={date} userId={userId} />}
    </div>
  )
}

export default MealSection;