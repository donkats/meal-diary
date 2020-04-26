import React, { useState, useEffect } from 'react';
import Goalcal from './Goalcal';
import MealSection from './MealSection';

const sections = ['breakfast', 'lunch', 'dinner'];

function Dashboard() {
  const userId = 9;
  const date = '2020-04-25';
  const kcalGoal = 2500;

  const [kcalSum, updateSum] = useState(0);
  console.log(kcalSum);

  function fetchSum() {
    fetch(`/calories/${userId}/${date}`)
      .then((data) => data.json())
      .then((data) => updateSum(data));
  }

  useEffect(() => {
    fetchSum();
  }, []);

  return (
    <main className="dashboard">
      <header className="date-header">
        <div className="back">{'<'}</div>
        <h1>Today</h1>
        <div className="next">{'>'}</div>
      </header>
      <Goalcal userId={userId} date={date} kcalSum={kcalSum} kcalGoal={kcalGoal} />
      {sections.map((meal) => <MealSection key={meal} meal={meal} userId={userId} date={date} fetchSum={fetchSum} />)}
    </main>
  );
}

export default Dashboard;