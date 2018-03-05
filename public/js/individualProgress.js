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

	var title = "C Major Accuracy";
	var data = [
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

	graph(title, data);
}

function renderBadgeText(num) {
	return BadgeArray[num-1];
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
	var key = document.getElementById("key");
	var scale = document.getElementById("scale");
    var progress = document.getElementById("progress");
		if (key.selectedIndex == 0 && scale.selectedIndex == 1 && progress.selectedIndex == 0)
		{	
			title = "C Minor Accuracy";
			data =[
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
			graph(title, data);
		}
		else if (key.selectedIndex == 0 && scale.selectedIndex == 0 && progress.selectedIndex == 0) {
			title = "C Major Accuracy";
			data = [
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
			graph(title, data);
		} else if (key.selectedIndex == 1 && scale.selectedIndex == 0 && progress.selectedIndex == 1)
	    {
			title = "G Major Speed";
			data = [
			    { x: new Date(2018, 01, 1), y: 90 },
			    { x: new Date(2018, 01, 2), y: 94 },
			    { x: new Date(2018, 01, 3), y: 95 },
			    { x: new Date(2018, 01, 6), y: 95 },
			    { x: new Date(2018, 01, 7), y: 95 },
			    { x: new Date(2018, 01, 11), y: 90 },
			    { x: new Date(2018, 01, 12), y: 90 },
			    { x: new Date(2018, 01, 20), y: 96 },
			    { x: new Date(2018, 01, 21), y: 100 },
			    { x: new Date(2018, 01, 22), y: 99 },
			    { x: new Date(2018, 01, 23), y: 101 },
			    { x: new Date(2018, 01, 24), y: 102 }
			  ]
			graph(title, data);
	    }
}

function signOut() {
    if (firebase.auth().currentUser) {
        firebase.auth().signOut();
    	window.location.href="splash.html";
    }
}

init();
