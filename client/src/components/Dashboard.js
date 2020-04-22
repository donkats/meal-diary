import React from 'react';
import FoodOverview from './FoodOverview';
import Goalcal from './Goalcal';

function Dashboard() {
  return (
    <main className="dashboard">
      <header className="date-header">
        <div className="back">{'<'}</div>
        <h1>Today</h1>
        <div className="next">{'>'}</div>
      </header>
      <Goalcal />
      <FoodOverview />
    </main>
  )
}

export default Dashboard;