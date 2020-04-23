import React, {useState, useEffect} from 'react'
import {Line} from 'react-chartjs-2'
import axios from 'axios'

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
          xaxis.push(record.date)
          yakis.push(record.sum)
        })
        console.log({xaxis, yakis})
        setData({
          Data: {
            labels: xaxis,
            datasets: [
              {
                label: 'Calories',
                data: yakis,
                backgroundColor: [
                  '#aad2ed',
                ],
              },
            ],
          },
        })
      })
    }, [])

    return (
      <div className="graphAnalytics">
        <Line data={data.Data}
        options={{
						xaxis: {
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
                  minRotation: 45
                }
             }],
							yAxes: [{
								ticks: {
									beginAtZero: true
								}
							}]
						}
					}} />
      </div>
    )
  }

export default Analytics;


