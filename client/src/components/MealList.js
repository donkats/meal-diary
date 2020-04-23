import React, { useState, useEffect } from 'react';

function MealList(props) {
  const { meal, userId, date } = props;
  const [meals, updateMeals] = useState([]);

  useEffect(() => {
    console.log('url', `/meals/${userId}/${meal}/${date}`);
    fetch(`/meals/${userId}/${meal}/${date}`)
      .then((data) => data.json())
      .then((data) => updateMeals(data));
  }, []);

  return (
    <div>
      <ul>
      {meals.map((item, index) => (
        <li key={index}>{item['food_name']}</li>
      ))}
      </ul>
    </div>
  )
}

export default MealList;