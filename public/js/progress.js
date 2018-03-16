var i;
var uid;
var BadgeArray = [
    "Beginner Badge: play metronome once",
    "Wildfire Badge: maintain a two week streak",
    "Overachiever Badge: score over 80% accuracy for all major and minor scales",
    "Treble Badge: practice with all time signatures",
    "Speedster Badge: practice at 150 BPM",
    "Artist Badge: score perfect accuracy",
    "Beethoven Badge: practice all scale variations"
];

var poorColor = "#e9e9f0";
var goodColor = "#FFF5EE";
var greatColor = "#7BCCB5";

var colorMapping = [poorColor, goodColor, greatColor];

var keyMapping = ["C", "G", "D", "A", "E", "B", "F#", "C#", "Ab", "Eb", "Bb", "F"];
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
