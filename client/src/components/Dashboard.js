import React from 'react';

function Dashboard(props) {
  return (
    <div className="dashboard">
      <header>Today</header>
      <div className="breakfast"><h2>Breakfast</h2></div>
      <div className="lunch"><h2>Lunch</h2></div>
      <div className="dinner"><h2>Dinner</h2></div>
    </div>
  )
}

export default Dashboard