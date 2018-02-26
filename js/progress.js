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

var poorColor = "#ff3d43";
var goodColor = "#608dff";
var greatColor = "#67934b";
var perfectColor = "#f9eb52";

var colorMapping = [poorColor, goodColor, greatColor, perfectColor];

var keyMapping = ["C", "C#-Db", "D", "D#-Eb", "E", "F", "F#-Gb", "G", "G#-Ab", "A", "A#-Bb", "B"];
var scaleMapping = ["Major", "Minor", "Harmonic", "Melodic", "Chromatic", "Pentatonic",
                    "Ionian", "Dorian", "Phrygian", "Lydian", "Mixolydian", "Aeolian", "Locrian"];

function init(){
    for (i=0; i<scaleMapping.length; i++) {
        var scaleName = scaleMapping[i];
        var scale = document.getElementById(scaleName);
        for(j = 2; j < scale.childNodes.length; j++){
            scaleChild = scale.childNodes[j];
            if(scaleChild.nodeName == 'TD'){
                // Binned Color Function
                scaleChild.style.backgroundColor = colorMapping[Math.floor(4*Math.random())];

                /* 
                //Gradient Functoin
                var red = Math.floor(255*Math.random());
                var green = 255-red;
                var colr = "rgb(" + red.toString() + ", " + green.toString() + ", 0)";
                scaleChild.style.backgroundColor = colr;
                console.log(colr);*/
            }
        }
    }
};

init();
