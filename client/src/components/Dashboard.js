import React from 'react';
import FoodOverview from './FoodOverview';

function Dashboard() {
  return (
    <main className="dashboard">
      <header className="date-header">
        <div className="back">{'<'}</div>
        <h1>Today</h1>
        <div className="next">{'>'}</div>
      </header>
      <FoodOverview />
    </main>
  )
}

export default Dashboard;