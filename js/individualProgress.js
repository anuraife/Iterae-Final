var i;
var BadgeArray = [
    "Level 1 Badge",
    "Level 2 Badge",
    "Level 3 Badge",
    "Level 4 Badge",
    "Speedster Badge",
    "100% Accuracy Badge",
    "Beethoven Badge"
]
function init(){
	var modal = document.getElementById("myModal");
	console.log(modal);
	var btns = [];
	var rects = [];
	for (i=1; i<8; i++) {
			btns[i] = document.getElementById(i.toString());
			btns[i].onclick = function() {
					var badgeInfo = event.srcElement.id;
					var rect = document.getElementById(badgeInfo).getBoundingClientRect();
					document.getElementById("badgeInfo").innerHTML = renderBadgeText(badgeInfo);
					modal.style.display = "block";
					modal.style.top = (rect.y + 65).toString() + "px";
					modal.style.left = (rect.x - 100).toString() + "px";
			}
	}
	var span = document.getElementsByClassName("close")[0];
	span.onclick = function() {
			modal.style.display = "none";
	}
	window.onclick = function(event) {
			if (event.target == modal) {
					modal.style.display = "none";
			}
	}

renderBadgeText = function(num) {
	return BadgeArray[num-1];
}
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
function Go(){
		var key = document.getElementById("key");
		var scale = document.getElementById("scale");
		if (key.selectedIndex == 0 && scale.selectedIndex == 1)
		{
			var chart = new CanvasJS.Chart("chart-box", {
			animationEnabled: true,
			theme: "light2",
			title:{
				text: "C Minor Accuracy"
			},
			axisY:{
				includeZero: false
			},
			data: [{
				type: "line",
				dataPoints: [
					{ x: new Date(2018, 01, 1), y: 70 },
					{ x: new Date(2018, 01, 3), y: 75 },
					{ x: new Date(2018, 01, 4), y: 80 },
					{ x: new Date(2018, 01, 6), y: 76 },
					{ x: new Date(2018, 01, 7), y: 77 },
					{ x: new Date(2018, 01, 10), y: 88 },
					{ x: new Date(2018, 01, 12), y: 90 },
					{ x: new Date(2018, 01, 20), y: 84 },
					{ x: new Date(2018, 01, 21), y: 84 },
					{ x: new Date(2018, 01, 22), y: 71 },
					{ x: new Date(2018, 01, 23), y: 80 },
					{ x: new Date(2018, 01, 25), y: 92 }
				]
			}]
		});
		chart.render();
	}
	else if (key.selectedIndex == 0 && scale.selectedIndex == 0)
	{
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
    else if (key.selectedIndex == 1 && scale.selectedIndex == 0)
    {
      var chart = new CanvasJS.Chart("chart-box", {
        animationEnabled: true,
        theme: "light2",
        title:{
          text: "G Major Accuracy"
        },
        axisY:{
          includeZero: false
        },
        data: [{
          type: "line",
          dataPoints: [
            { x: new Date(2018, 01, 1), y: 60 },
            { x: new Date(2018, 01, 2), y: 62 },
            { x: new Date(2018, 01, 3), y: 64 },
            { x: new Date(2018, 01, 6), y: 70 },
            { x: new Date(2018, 01, 7), y: 73 },
            { x: new Date(2018, 01, 11), y: 75 },
            { x: new Date(2018, 01, 12), y: 67 },
            { x: new Date(2018, 01, 20), y: 70 },
            { x: new Date(2018, 01, 21), y: 75 },
            { x: new Date(2018, 01, 22), y: 76 },
            { x: new Date(2018, 01, 23), y: 74 },
            { x: new Date(2018, 01, 24), y: 72 }
          ]
        }]
      });
      chart.render();
      }
}

init();
