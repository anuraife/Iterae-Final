var tempo = 90;            // Initial metronome tempo
var paused = true;		   // Play/pause state
var metronomeLeft = true;  // Boolean for metronome arm position
var rhythm = "consistent"; // The rhythm type
var repetitions = 5;       // Number of ticks before speeding up
var increment = 5;         // How many BPMs the metronome speeds up by
var tempoAccel = tempo;	   // Temporary tempo for acceleration
var count = 0;			   // Helper variable for acceleration
var interval;
var timeout;
var click = new Audio('res/metronome/click.wav');
var currSelScale;

// Initialize the progress page
function init() {
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

	document.getElementById("bpm").value = tempo.toString();
	selectRhythm(rhythm);

	currSelScale = document.getElementsByClassName("selected")[0];
};

// Play/pause button is pressed for metronome
function metronome() {
	var playPause = document.getElementById("playPause");
	paused = !paused;
	if (paused) {
		playPause.src = "res/play.png";
		document.getElementById("metro").src = "res/metronome/metro_1/metronome.png";
		clearer();
	} else {
		playPause.src = "res/pause.png";
		playerTime = document.getElementById("player-time");
		startMetronome();
	}
}

// Select the button with corresponding id
function selectRhythm(id) {
	document.getElementById(id).style.color = "white";
	document.getElementById(id).style.backgroundColor = '#88bbd6';
}

// Deselect the button with corresponding id
function deselectRhythm(id) {
	document.getElementById(id).style.color = "black";
	document.getElementById(id).style.backgroundColor = "#fefefe";
}

// Switch the rhytm type for a newly defined one
function switchRhythm(newRhythm){
	if (rhythm != newRhythm) {
		deselectRhythm(rhythm);
		selectRhythm(newRhythm);
		rhythm = newRhythm;
	}
	if (!paused) {startMetronome()};
}

// Maps saved rhythm to metronome and plays it
function startMetronome() {
	clearer();
	switch(rhythm) {
    	case 'consistent':
        	consistent();
   	        break;
   	    case 'acceleration':
  	        acceleration();
   	        break;
  	     case 'subdivision':
       	    subdivision();
   	        break;
    	default:
	}
}

// Metronome action on each swing
function tick() {
	frame = metronomeLeft ? "l2" : ("r2");
	document.getElementById("metro").src = "res/metronome/metro_1/metro_" + frame + ".png";
	metronomeLeft = !metronomeLeft;
	click.play();
}

// Steady beating
function consistent() {
	interval = setInterval(function(){
		tick();
	}, 60000/tempo);
}

// Gradually gets faster
function acceleration() {
	tick();
	if (count > repetitions) {
		tempoAccel += increment;
		document.getElementById("bpm").value = tempoAccel.toString();
		count = 0;
	}
	count++;
	timeout = setTimeout(function(){
		acceleration();
	}, 60000/tempoAccel);
}

// Divided into swing
function subdivision() {
	interval = setInterval(function(){
		tick();
		timeout = setTimeout(function(){
			tick();
		}, 90000/tempo);
	}, 120000/tempo);
}

// Clear intervals and timeouts
function clearer() {
	clearInterval(interval);
	clearTimeout(timeout);
	tempoAccel = tempo;
	count = 0;
}

function changeKey(key){
	
	var scale = document.getElementById('scale-name').innerHTML.toLowerCase();
	if (key[1] == ("#")){
		document.getElementById('scale-notes').src='res/scales/' + key[0].toLowerCase() + 'sharp' + '_' + scale + '.png';
	}
	else if (key[1] == ('b')){
		document.getElementById('scale-notes').src='res/scales/' + key[0].toLowerCase() + 'flat'+ '_' + scale + '.png';
	}
	else{
		document.getElementById('scale-notes').src='res/scales/' + key.toLowerCase() + '_' + scale + '.png';
	}
	document.getElementById('key-name').innerHTML = key;
}

function changeLevel(level){
	var scaleLevel = level + "-scale-container";
	var currLevel = document.getElementsByClassName('selected-level')[0];
	if(currLevel != null){
		currLevel.classList = 'other-level';
	}
	document.getElementById(scaleLevel).classList = 'selected-level';
}

function changeScale(level, clickedID){	
	//minmizes the popup
	console.log('currrr');
	console.log(currSelScale);

	var scaleLevel = level + "-scale-container";
	var clickedScale = document.getElementById(clickedID);
	
	var lev = level.substring(0, 3);
	
	var currScaleName = document.getElementById('scale-name').innerHTML;
	//var currSelScale = document.getElementsByClassName(lev)[0];
	
	document.getElementById(scaleLevel).classList = 'other-level';
	
	console.log('cursel');
	console.log(currSelScale);
	currSelScale.classList.remove('selected');
	currSelScale.classList.add('other');

	clickedScale.classList.remove('other');
	clickedScale.classList.add('selected');

	currSelScale = clickedScale;

	document.getElementById('scale-name').innerHTML = currSelScale.innerHTML;

	var key = document.getElementById('key-name').innerHTML.toLowerCase();
	var scale = document.getElementById('scale-name').innerHTML.toLowerCase();
	document.getElementById('scale-notes').src='res/scales/' + key + '_' + scale + '.png';

}

function signOut() {
    if (firebase.auth().currentUser) {
        firebase.auth().signOut();
    	window.location.href="splash.html";
    }
}

window.onload = function() {
	init();
}
