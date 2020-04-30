import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2';
import moment from 'moment';

const yellow = '#efca08';
const yellowBg = 'rgba(239, 202, 8, 0.2)';

function CarbGraph(props) {
  const { userId } = props;
  const [data, setData] = useState({})
  
  useEffect(()=> {
    fetch(`/carb/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setData({
          labels: data.map((item) => moment(item.date).format('DD-MM-YYYY')),
          datasets: [
            {
              label: "Total Carb intake",
              data: data.map((item) => item.sum),
              pointRadius: 4,
              pointBorderColor: yellow,
              pointHoverBackgroundColor: 'rgba(54, 162, 235, 1)',
              pointHoverRadius: 8,
              backgroundColor: yellowBg,
              borderColor: yellow,
              borderWidth: 2
            }
          ]
        })
    })
  }, [userId])

  return (
    data ?
    <Line data={data}
      options={{
        title: {
          display: true,
          text: 'Carbohydrates',
          fontSize: 20
        },
        legend: {
          display: false
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
              labelString: 'Carbohydrates (g)',
              fontSize: 16
            }
          }]
        }
      }} />
    :
    'Loading...'
  );
}

export default CarbGraph;