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
      </div>
      <div className="macros">
        <div className="protein">PROTEIN<br />{Math.round(proteins)}g</div>
        <div className="carbs">CARBS<br />{Math.round(carbs)}g</div>
        <div className="fat">FAT<br />{Math.round(fat)}g</div>
      </div>
    </div>
  )
}

export default KcalBar;