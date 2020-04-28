import React, { useState, useEffect, useCallback } from 'react';
import moment from 'moment';
import KcalBar from './KcalBar';
import MealSection from './MealSection';
import DateSlider from './DateSlider';

const sections = ['breakfast', 'lunch', 'dinner'];

function Dashboard(props) {
  const { userId, goal } = props;
  
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [kcalSum, updateSum] = useState(0);

  const fetchSum = useCallback(() => {
    fetch(`/calories/${userId}/${date}`)
      .then((data) => data.json())
      .then((data) => updateSum(data));
  }, [userId, date]);

  useEffect(() => {
    fetchSum();
  }, [fetchSum]);

  return (
    <div className="dashboard">
      <DateSlider date={date} setDate={setDate} />
      <KcalBar userId={userId} date={date} kcalSum={kcalSum} kcalGoal={goal} />
      {sections.map((meal) => {
        return <MealSection key={meal} meal={meal} userId={userId} date={date} fetchSum={fetchSum} />}
      )}
    </div>
  );
}

export default Dashboard;