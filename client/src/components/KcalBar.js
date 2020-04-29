import React from 'react';
import '../styles/KcalBar.css';

function KcalBar(props) {
  const { kcalSum, kcalGoal, fat, carbs, proteins } = props;
  const percentage = Math.round((kcalSum / kcalGoal) * 100);

  return (
    <div className="kcal-bar">
      <div id="progress-bar">
        <div id="filler" style={{width: `${percentage}%`}}>
          <p className="kcal-text">Calories: {Math.round(kcalSum)} / {kcalGoal} kcal ({percentage}%)</p>
        </div>
      <div>fat: {Math.round(fat)}g carbs: {Math.round(carbs)}g proteins:{Math.round(proteins)}g</div>
      </div>
    </div>
  )
}

export default KcalBar;