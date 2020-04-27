import React from 'react';
import Goalcal from './Goalcal';
import MealSection from './MealSection';
//added props to test
function Dashboard(props) {
  const id = props.id;
  
  console.log('users id on dashboard props', id)
  return (
    <main className="dashboard">
      <header className="date-header">
        <div className="back">{'<'}</div>
        <h1>Today</h1>
        <div className="next">{'>'}</div>
      </header>
      <Goalcal userId={id} date="2020-04-25"/>
      <MealSection meal="breakfast" userId={id} date="2020-04-25"/>
      <MealSection meal="lunch" userId={id} date="2020-04-25"/>
      <MealSection meal="dinner" userId={id} date="2020-04-25"/>
    </main>
  )
}

export default Dashboard;