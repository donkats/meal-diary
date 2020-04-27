import React, { useState, useEffect } from 'react';
import KcalBar from './KcalBar';
import MealSection from './MealSection';
import DateSlider from './DateSlider';
// import { useAppContext } from './context';
const moment = require('moment');

const sections = ['breakfast', 'lunch', 'dinner'];

function Dashboard(props) {
  // const { isAuthenticated } = useAppContext();

  const userId = props.id;
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [kcalSum, updateSum] = useState(0);
  const kcalGoal = 2500;

  function fetchSum() {
    fetch(`/calories/${userId}/${date}`)
      .then((data) => data.json())
      .then((data) => updateSum(data));
  }

  useEffect(() => {
    fetchSum();
  }, [date]);

  return (
    <main className="dashboard">
      <DateSlider date={date} setDate={setDate} />
      <KcalBar userId={userId} date={date} kcalSum={kcalSum} kcalGoal={kcalGoal} />
      {sections.map((meal) => <MealSection key={meal} meal={meal} userId={userId} date={date} fetchSum={fetchSum} />)}
    </main>
  );
}

export default Dashboard;