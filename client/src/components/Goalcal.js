import React, { useState } from 'react';


function Goalcal() {
  const [state, setState] = useState({calories: 0, percent: 0});
  function update(e) {
    e.preventDefault();
    setState({calories: e.target[0].value, percent: Math.round(e.target[0].value / 2500 * 100)});
  }
  
  return (
    <div className="calories-summary">
      <div className="calories-goal"><h2>Goal Calories</h2><p className="cal-counter">2500 calories</p></div>
      <div className="calories-intake">
        <h2>Consumed Calories</h2>
        <div id="progress-bar">
          <div id="filler" style={{width: `${state.percent}%`}}>
            <p className="text">Calories: {`${state.calories}`} ({`${state.percent}%`})</p>
          </div>
        </div></div>
        <form onSubmit={update}>
          <input type="text" />
          <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default Goalcal;
