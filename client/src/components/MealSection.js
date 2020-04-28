import React, { useState, useEffect } from 'react';
import '../styles/MealSection.css';
import Popup from './Popup';

function MealSection(props) {
  const { meal, isAuth, userId, date, fetchSum } = props;
  const [meals, updateMeals] = useState([]);

  const totalKcal = meals.length > 0 ? meals.reduce((val, item) => val + item.kcal_intake, 0) : 0;

  function fetchMeals() {
    fetch(`/meals/${userId}/${meal}/${date}`)
      .then((data) => data.json())
      .then((data) => updateMeals(data));
  }

  useEffect(() => {
    if (isAuth) fetchMeals();
  }, [date]);

  const showPopup = (meal) => {
    document.getElementById(meal).classList.remove('hidden');
  }
  
  const hidePopup = (meal) => {
    document.getElementById(meal).classList.add('hidden');
    fetchMeals();
    fetchSum();
  }

  function deleteItem(mealId) {
    console.log(`delete ${mealId}!`)
    const fetchObj = {
      method: 'DELETE'
    }

    fetch(`/delmeals/${mealId}`, fetchObj)
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
      <button className="add-btn" onClick={() => showPopup(meal)}>+ add {props.meal}</button>
      <div className="total-kcal">Total: {Math.round(totalKcal)} kcal</div>
      <Popup meal={meal} hidePopup={hidePopup} date={date} userId={userId} />
    </div>
  )
}

export default MealSection;