var i;
var uid;
var BadgeArray = [
    "Level 1 Badge",
    "Level 2 Badge",
    "Level 3 Badge",
    "Level 4 Badge",
    "Speedster Badge",
    "100% Accuracy Badge",
    "Beethoven Badge"
]

var poorColor = "#e9e9f0";
var goodColor = "#FFF5EE";
var greatColor = "#7BCCB5";

var colorMapping = [poorColor, goodColor, greatColor];

var keyMapping = ["C", "C#-Db", "D", "D#-Eb", "E", "F", "F#-Gb", "G", "G#-Ab", "A", "A#-Bb", "B"];
var scaleMapping = ["Major", "Minor", "Harmonic", "Melodic", "Chromatic", "Pentatonic",
                    "Ionian", "Dorian", "Phrygian", "Lydian", "Mixolydian", "Aeolian", "Locrian"];

function init(){
    // Check if logged in
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            uid = user.uid;
            var providerData = user.providerData;
            signedIn = true;

            renderBadges(uid, "color");
            document.getElementById('sign-out').addEventListener('click', signOut, false);
        } else {
            signedIn = false;
            window.location.href="splash.html";
        }
    });

    for (i=0; i<scaleMapping.length; i++) {
        var scaleName = scaleMapping[i];
        var scale = document.getElementById(scaleName);
        for(j = 2; j < scale.childNodes.length; j++){
            scaleChild = scale.childNodes[j];
            if(scaleChild.nodeName == 'TD'){
                scaleChild.style.backgroundColor = colorMapping[Math.floor(3*Math.random())];
            }
        }
    } 
};

window.onload = function() {
    init();
}
