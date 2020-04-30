import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2';
import moment from 'moment';

const red = '#ba0d2f';
const redBg = 'rgba(186, 13, 47, 0.2)';

function FatGraph(props) {
  const { userId } = props;
  const [data, setData] = useState(null);

  useEffect(()=> {
    fetch(`/fat/${userId}`)
      .then((res) => res.json())
      .then((data) => setData({
          labels: data.map((item) => moment(item.date).format('DD-MM-YYYY')),
          datasets: [
            {
              label: "Fat intake",
              data: data.map((item) => Math.round(item.sum)),
              pointRadius: 4,
              pointBorderColor: red,
              pointHoverBackgroundColor: 'rgba(54, 162, 235, 1)',
              pointHoverRadius: 8,
              backgroundColor: redBg,
              borderColor: red,
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
          text: 'Fat',
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
              labelString: 'Fat (g)',
              fontSize: 16
            }
          }]
        }
      }} />
    :
    'Loading...'
  );
}

export default FatGraph;