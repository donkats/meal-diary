import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2';
import moment from 'moment';

function CalorieGraph(props) {
  const { userId } = props;
  const [data, setData] = useState(null);

  useEffect(()=> {
    fetch(`/calorie/${userId}`)
      .then((res) => res.json())
      .then((data) => setData({
          labels: data.map((item) => moment(item.date).format('DD-MM-YYYY')),
          datasets: [
            {
              label: "Calorie intake",
              data: data.map((item) => Math.round(item.sum)),
              pointRadius: 4,
              pointBorderColor: 'rgba(54, 162, 235, 1)',
              pointHoverBackgroundColor: 'rgba(54, 162, 235, 1)',
              pointHoverRadius: 8,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 2
            }
          ]
        })
      );
  }, [userId])

  return (
    data ?
    <Line data={data}
      options={{
        title: {
          display: true,
          text: 'Calorie intake',
          fontSize: 20
        },
        legend: {
          display: false,
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              parser: 'DD-MM-YYYY',
              unit: 'day',
              unitStepSize: 1,
              displayFormats: {
                day: 'DD-MM-YYYY'
              },
            },
            ticks: {
              source: 'data',
              autoSkip: false,
              minRotation: 45,
              fontSize: 14,
            },
            scaleLabel: {
              display: false,
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              fontSize: 14,
            },
            scaleLabel: {
              display: true,
              labelString: 'Number of calories',
              fontSize: 16
            }
          }]
        }
      }} />
    :
    'Loading...'
  );
}

export default CalorieGraph;