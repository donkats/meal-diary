import React, { useState, useEffect } from 'react';

function Goalcal(props) {
  const id = props.userId;
  const date = props.date;
  // const id = 3;
  // const date = '23-04-2020';

  const [calories, updateCalories] = useState({});

  useEffect(() => {
    fetch(`/calories/${id}/${date}`)
      .then((data) => data.json())
      .then((data) => updateCalories({calories: Math.round(data), percent: Math.round(data/2500*100) }));
  }, []);

  return (
    <div className="calories-summary">
      <div className="calories-goal"><h2>Goal Calories</h2><p className="cal-counter">2500 calories</p></div>
      <div className="calories-intake">
        <h2>Consumed Calories</h2>
        <div id="progress-bar">
          <div id="filler" style={{width: `${calories.percent}%`}}>
            <p className="text">Calories: {`${calories.calories}`} ({`${calories.percent}%`})</p>
          </div>
        </div></div>
    </div>
  )
}

export default Goalcal;