import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import axios from 'axios'
import moment from 'moment';

function Analytics() {
  const [data, setData] = useState([])
  const [Calories, setCalories] = useState([])

  let xaxis = []
  let yakis = []
  useEffect(() => {
    axios.get('http://localhost:3001/calorie/9').then(res => {
      const calorieInfo = res.data
      setCalories(calorieInfo)

      calorieInfo.forEach(record => {
        console.log(record)
        xaxis.push(moment(record.date).format('DD-MM-YYYY'))
        yakis.push(Math.round(record.sum))
      })
      console.log({ xaxis, yakis })
      setData({
        Data: {
          labels: xaxis,
          datasets: [{
            label: 'Calories',
            pointRadius: 4,
            pointBorderColor: 'rgba(54, 162, 235, 1)',
            pointHoverBackgroundColor: 'rgba(54, 162, 235, 1)',
            pointHoverRadius: 8,
            data: yakis,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 2
          }],
        },
      })
    })
  }, [])

  return (
    <div className="graphAnalytics">
      <Line data={data.Data}
        options={{
          title: {
            display: true,
            text: 'Calorie intake per day',
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
                labelString: 'Number of calories',
                fontSize: 20
              }
            }]
          }
        }} />
    </div>
  )
}

export default Analytics;


