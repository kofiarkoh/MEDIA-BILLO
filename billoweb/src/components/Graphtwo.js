import React, { Component } from 'react'
import CanvasJSReact from '../graphfiles/canvasjs.react'
//var CanvasJSReact = require('../graphfiles/canvasjs.react');
//var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart
class Graph extends Component {
    render() {
		const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light2", //"light1", "dark1", "dark2"
			title:{
				text: "Simple Column Chart with Index Labels"
			},
			data: [{
				type: "column", //change type to bar, line, area, pie, etc
				//indexLabel: "{y}", //Shows y value on all Data Points
				indexLabelFontColor: "#5A5757",
				indexLabelPlacement: "outside",
				dataPoints: [
					{ 'label': 'Lawrence', y: 71 },
					{ 'label': 'Lawrence', y: 55 },
					{ 'label': 'Lawrence', y: 50 },
					{ 'label': 'Lawrence', y: 65 },
					{ 'label': 'Lawrence', y: 71 },
					{ 'label': 'Lawrence', y: 68 },
					{ 'label': 'Lawrence', y: 38 },
					{ 'label': 'Lawrence', y: 92, indexLabel: "Highest" },
					{ 'label': 'Lawrence', y: 54 },
					{ 'label': 'Lawrence', y: 60 },
					{ 'label': 'Lawrence', y: 21 },
					{ 'label': 'Lawrence', y: 49 },
					{ 'label': 'Lawrence', y: 36 }
				]
			}]
		}
		
		return (
		<div>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default Graph
