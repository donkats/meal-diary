import React, { useState, useEffect } from 'react';
import Goalcal from './Goalcal';
import MealSection from './MealSection';
import Dateslider from './Dateslider';
// import { useAppContext } from './context';
const moment = require('moment');

const sections = ['breakfast', 'lunch', 'dinner'];

function Dashboard(props) {
  // const { isAuthenticated } = useAppContext();

  // const iddashboard = props.id;
  // console.log('id on dashboard', iddashboard);
  // console.log('authentication', isAuthenticated["id"]);
  const userId = props.id;
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  // const date = '2020-04-25';
  console.log('date from moment', moment().format('YYYY-MM-DD'));
  console.log(date);
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
      <Dateslider date={date}/>
      <Goalcal userId={userId} date={date} kcalSum={kcalSum} kcalGoal={kcalGoal} />
      {sections.map((meal) => <MealSection key={meal} meal={meal} userId={userId} date={date} fetchSum={fetchSum} />)}
    </main>
  );
}

export default Dashboard;