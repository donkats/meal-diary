import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2';
import moment from 'moment';

const blue = '#386285';
const blueBg = 'rgba(56, 98, 133, 0.2)';

function ProteinGraph(props) {
  const { userId } = props;
  const [data, setData] = useState(null);

  useEffect(()=> {
    fetch(`/protein/${userId}`)
      .then((res) => res.json())
      .then((data) => setData({
          labels: data.map((item) => moment(item.date).format('DD-MM-YYYY')),
          datasets: [
            {
              label: "Protein intake",
              data: data.map((item) => Math.round(item.sum)),
              pointRadius: 4,
              pointBorderColor: blue,
              pointHoverBackgroundColor: 'rgba(54, 162, 235, 1)',
              pointHoverRadius: 8,
              backgroundColor: blueBg,
              borderColor: blue,
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
          text: 'Protein',
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
              labelString: 'Protein',
              fontSize: 16
            }
          }]
        }
      }} />
    :
    'Loading...'
  );
}

export default ProteinGraph;