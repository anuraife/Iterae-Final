
function init(){

var chart = new CanvasJS.Chart("chart-box", {
	animationEnabled: true,
	theme: "light2",
	title:{
		text: "C Major Accuracy"
	},
	axisY:{
		includeZero: false
	},
	data: [{        
		type: "line",       
		dataPoints: [
			{ x: new Date(2018, 01, 1), y: 63 },
			{ x: new Date(2018, 01, 3), y: 62 },
			{ x: new Date(2018, 01, 4), y: 64 },
			{ x: new Date(2018, 01, 6), y: 65 },
			{ x: new Date(2018, 01, 7), y: 68 },
			{ x: new Date(2018, 01, 10), y: 68 },
			{ x: new Date(2018, 01, 12), y: 67 },
			{ x: new Date(2018, 01, 20), y: 70 },
			{ x: new Date(2018, 01, 21), y: 73 },
			{ x: new Date(2018, 01, 22), y: 71 },
			{ x: new Date(2018, 01, 23), y: 74 },
			{ x: new Date(2018, 01, 25), y: 72 }
		]
	}]
});
chart.render();
}


init();