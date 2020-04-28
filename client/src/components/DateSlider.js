import React from 'react';
import moment from 'moment';
import '../styles/DateSlider.css';

const formats = {
  sameDay: '[Today]',
  nextDay: '[Tomorrow]',
  nextWeek: 'dddd, MMMM Do',
  lastDay: '[Yesterday]',
  lastWeek: 'dddd, MMMM Do',
  sameElse: 'dddd, MMMM Do'
};

function DateSlider(props) {
  const { date, setDate } = props;

  return (
    <header className="dateslider">
      <input type="image" className="back" src="https://img.icons8.com/ios-filled/50/000000/chevron-left.png" 
        alt="left" onClick={() => setDate(moment(date).subtract(1, 'days').format('YYYY-MM-DD'))} />
      <button className="today" onClick={() => setDate(moment().format('YYYY-MM-DD'))}>
        <img src="https://img.icons8.com/ios-filled/50/000000/calendar.png" alt="calendar" />
        {moment(date).calendar(null, formats)}
      </button>
      <input type="image" className="next" src="https://img.icons8.com/ios-filled/50/000000/chevron-right.png" 
        alt="right" onClick={() => setDate(moment(date).add(1, 'days').format('YYYY-MM-DD'))} />
    </header>
  );
}

export default DateSlider;