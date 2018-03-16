var i;
var BadgeArray = [
    "Level 1 Badge",
    "Level 2 Badge",
    "Level 3 Badge",
    "Level 4 Badge",
    "Speedster Badge",
    "100% Accuracy Badge",
    "Beethoven Badge"
];
var key_array =
["C",
"C#/Db",
"D",
"D#/Eb",
"E",
"F",
"F#/Gb",
"G",
"G#/Ab",
"A",
"A#/Bb",
"B"];
var scale_array =
[
"Major",
"Minor",
"Harmonic",
"Melodic" ,
"Chromatic",
"Pentatonic",
"Ionian",
"Dorian",
"Phrygian",
"Lydian",
"Mixolydian",
"Aeolian",
"Locrian"
];
var progress_array = ["Accuracy", "Speed"];
function init(){
		// Check if logged in
	firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            signedIn = true;
            document.getElementById('sign-out').addEventListener('click', signOut, false);
        } else {
            signedIn = false;
            window.location.href="splash.html";
        }
    });

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
  function renderBadgeText(num) {
  	return BadgeArray[num-1];
  }
	var title = "C Major Accuracy";
	var data = getDataPoints(50,100);
	graph(title, data);
}
function getDataPoints(upperLimit,lowerLimit)
{
  var dates = [new Date(2018, 01, 1), new Date(2018, 01, 3), new Date(2018, 01, 4),
  new Date(2018, 01, 6), new Date(2018, 01, 7), new Date(2018, 01, 10), new Date(2018, 01, 12), new Date(2018, 01, 20),
  new Date(2018, 01, 21),new Date(2018, 01, 22), new Date(2018, 01, 23),new Date(2018, 01, 25)];
  var i;
  var arr = [];
  for (i = 0; i < 12; i++) {
    arr.push({
        x: dates[i],
        y: lowerLimit + Math.round(Math.random() * (upperLimit - lowerLimit))
    });
}
return arr;
}

function graph(title, data) {
	var chart = new CanvasJS.Chart("chart-box", {
		animationEnabled: true,
		theme: "light2",
		title:{
			text: title
		},
		axisY:{
			includeZero: false
		},
		data: [{
			type: "line",
			dataPoints: data
		}]
	});
	chart.render();
}

function Go(){
	var key = document.getElementById("key").selectedIndex;
	var scale = document.getElementById("scale").selectedIndex;
  var progress = document.getElementById("progress").selectedIndex;
  console.log(key);
  title = key_array[key]+" "+scale_array[scale]+ " " +progress_array[progress];
  if (progress == 0)
  {data = getDataPoints(50, 100);}
  else
  {data = getDataPoints(90,200);}
  graph(title, data);
}

// function Onload(){
//   var key = document.getElementById("key").selectedIndex;
// 	var scale = document.getElementById("scale").selectedIndex;
//   var progress = document.getElementById("progress").selectedIndex;
//   key =
// }
init();
