import React, { useState, useEffect, useCallback } from 'react';
import moment from 'moment';
import KcalBar from './KcalBar';
import MealSection from './MealSection';
import DateSlider from './DateSlider';

const sections = ['breakfast', 'lunch', 'dinner'];

function Dashboard(props) {
  const { userId, goal } = props;
  
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [intakes, updateIntakes] = useState( {kcal: 0, carbs: 0, fat: 0, proteins: 0});

  const fetchSum = useCallback(() => {
    fetch(`/calories/${userId}/${date}`)
      .then((data) => data.json())
      .then((data) => updateIntakes(data));
  }, [userId, date]);

  useEffect(() => {
    fetchSum();
  }, [fetchSum]);

  return (
    <div className="dashboard">
      <DateSlider date={date} setDate={setDate} />
      <KcalBar userId={userId} date={date} kcalSum={intakes["kcal"]} kcalGoal={goal} fat={intakes["fat"]} carbs={intakes["carbs"]} proteins={intakes["proteins"]}/>
      {sections.map((meal) => {
        return <MealSection key={meal} meal={meal} userId={userId} date={date} fetchSum={fetchSum} />}
      )}
    </div>
  );
}

export default Dashboard;