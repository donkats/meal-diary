import React from 'react';
import Goalcal from './Goalcal';
import MealSection from './MealSection';

function Dashboard() {
  return (
    <main className="dashboard">
      <header className="date-header">
        <div className="back">{'<'}</div>
        <h1>Today</h1>
        <div className="next">{'>'}</div>
      </header>
      <Goalcal />
      <MealSection meal="breakfast" userId="3" date="23-04-2020"/>
      <MealSection meal="lunch" userId="3" date="23-04-2020"/>
      <MealSection meal="dinner" userId="3" date="23-04-2020"/>
    </main>
  )
}

export default Dashboard;