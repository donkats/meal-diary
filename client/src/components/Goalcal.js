import React, { useState, useEffect } from 'react';

function Goalcal(props) {
  const id = props.userId;
  const date = props.date;
  const kcalGoal = 2800;

  const [calories, updateCalories] = useState({});

  useEffect(() => {
    fetch(`/calories/${id}/${date}`)
      .then((data) => data.json())
      .then((data) => updateCalories({calories: Math.round(data), percent: Math.round(data/kcalGoal*100) }));
  }, []);

  return (
    // <div className="calories-summary">
    //   <div className="calories-goal"><h2>Goal Calories</h2><p className="cal-counter">2500 calories</p></div>
    //   <div className="calories-intake">
    //     <h2>Consumed Calories</h2>
    //     <div id="progress-bar">
    //       <div id="filler" style={{width: `${calories.percent}%`}}>
    //         <p className="text">Calories: {calories.calories} / 2500 ({calories.percent}%)</p>
    //       </div>
    //     </div></div>
    // </div>
    <div class="kcal-bar">
      <div id="progress-bar">
        <div id="filler" style={{width: `${calories.percent}%`}}>
          <p className="kcal-text">Calories: {calories.calories} / {kcalGoal} kcal ({calories.percent}%)</p>
        </div>
      </div>
    </div>
  )
}

export default Goalcal;