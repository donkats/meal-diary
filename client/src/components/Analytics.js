import React from 'react';
import {Line} from 'react-chartjs-2';

const state = {
  labels: ['18-04-2020', '19-04-2020', '20-04-2020',
	'21-04-2020', '22-04-2020'],
  datasets: [
    {
      label: 'Calories',
      fill: false,
      lineTension: 0.5,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [1565, 1959, 2080, 1781, 2256]
    }
  ]
}

export default class App extends React.Component {
  render() {
    return (
      <div className="graphAnalytics">
        <Line
          data={state}
          options={{
            title:{
              display:true,
              text:'Calorie intake per day',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
						},
						scales: {
							yAxes: [{
								ticks: {
									beginAtZero: true
								}
							}]
						}
          }}
        />
      </div>
    );
  }
}


// import React from 'react';
// import { Line } from 'react-chartjs-2';

// const state = {
// 	labels: ['18-04-2020', '19-04-2020', '20-04-2020',
// 		'21-04-2020', '22-04-2020'],
// 	datasets: [
// 		{
// 			label: 'Calories',
// 			fill: false,
// 			lineTension: 0.5,
// 			backgroundColor: 'rgba(75,192,192,1)',
// 			borderColor: 'rgba(0,0,0,1)',
// 			borderWidth: 2,
// 			data: [1865, 1959, 2080, 2181, 1856]
// 		}
// 	]
// }

// class Analytics extends React.Component {
// 	constructor() {
// 		super();
// 		this.state = {
// 			data: {
// 				labels: [],
// 				datasets: []
// 			}
// 		};
// 	}

// 	componentDidMount() {
// 		fetch('/calories')
// 			.then(results => {
// 				return results.json();
// 			}).then(data => {

// 				let receivedData = data.map((datapost) => {
// 					return (
// 						{
// 							data: {
// 								labels: datapost.timestamp,
// 								datasets: datapost.temp_0
// 							}
// 						}

// 					)
// 				})
// 				this.setState({ data: receivedData }, function () {
// 					console.log(this.state.data);
// 				});
// 			})
// 	}

// 	render() {
// 		return (
// 			<div className="graphAnalytics">
// 				<Line
// 					data={this.state.data}
// 					options={{
// 						title: {
// 							display: true,
// 							text: 'Calorie intake per day',
// 							fontSize: 20
// 						},
// 						legend: {
// 							display: true,
// 							position: 'right'
// 						},
// 						scales: {
// 							yAxes: [{
// 								ticks: {
// 									beginAtZero: true
// 								}
// 							}]
// 						}
// 					}}
// 				/>
// 			</div>
// 		);
// 	}
// }

// export default Analytics;
