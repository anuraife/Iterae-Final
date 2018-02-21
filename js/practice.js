var tempo = 90;
var currSelScale = document.getElementsByClassName("selected")[0];
var currSelLevel = document.getElementsByClassName("selected-level")[0];

function init() {
	document.getElementById("bpm").value = tempo.toString();
};


init();
