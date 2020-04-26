import React from 'react';

function Goalcal(props) {
  const { kcalSum, kcalGoal } = props;
  const percentage = Math.round((kcalSum / kcalGoal) * 100);

  return (
    <div className="kcal-bar">
      <div id="progress-bar">
        <div id="filler" style={{width: `${percentage}%`}}>
          <p className="kcal-text">Calories: {Math.round(kcalSum)} / {kcalGoal} kcal ({percentage}%)</p>
        </div>
      </div>
    </div>
  )
}

export default Goalcal;