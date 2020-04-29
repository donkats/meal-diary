import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2';
import moment from 'moment';

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
              pointBorderColor: 'rgba(54, 162, 235, 1)',
              pointHoverBackgroundColor: 'rgba(54, 162, 235, 1)',
              pointHoverRadius: 8,
              backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
              ],
              borderColor: [
                'rgba(54, 162, 235, 1)',
              ],
              borderWidth: 2
            }
          ]
        })
      );
  }, [userId])

  return (
    <div className="graphAnalytics">
      {data ?
      <Line data={data}
        options={{
          title: {
            display: true,
            text: 'Fat intake per day',
            fontSize: 20
          },
          legend: {
            display: true,
            position: 'right'
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
                display: true,
                labelString: 'Day',
                fontSize: 20,
              }
            }],
            yAxes: [{
              ticks: {
                beginAtZero: true,
                fontSize: 14,
              },
              scaleLabel: {
                display: true,
                labelString: 'Amount of fat',
                fontSize: 20
              }
            }]
          }
        }} />
      :
      'Loading...'}
    </div>
  );
}

export default FatGraph;