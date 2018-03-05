var uid;
var avatarIndex;
var bpm;
var timeSig;
var currMetronome = 1;

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

          renderSettings(uid);
          document.getElementById('sign-out').addEventListener('click', signOut, false);
      } else {
          signedIn = false;
          window.location.href="splash.html";
      }
  });
}

function renderSettings(uid) {
  avatarIndex = localStorage.getItem('avatar');
  document.getElementById("avatar" + avatarIndex.toString()).classList.add("avatar-active");
  
  firebase.database().ref('/users/' + uid).once('value').then(function(snapshot) {
    bpm = (snapshot.val() && snapshot.val().bpm) || 90;
    document.getElementById('bpm').text = bpm;

    timeSig = (snapshot.val() && snapshot.val().timeSig) || "4/4";

    metronome = (snapshot.val() && snapshot.val().metronome) || 1;
    changeMetronome(metronome);
  });
}

function selectAvatar(index) {
    document.getElementById("avatar" + avatarIndex.toString()).classList.remove("avatar-active")
    avatarIndex = index;
    document.getElementById("avatar" + avatarIndex.toString()).classList.add("avatar-active")
}

function changeMetronome(n) {
  if (currMetronome != n) {
    document.getElementById("metronome" + currMetronome.toString()).style.opacity = 0.4;
    currMetronome = n;
    document.getElementById("metronome" + currMetronome.toString()).style.opacity = 1;
  }
}

function saveSettings() {
  firebase.database().ref('users/' + uid).set({
    avatar: avatarIndex,
    bpm: bpm,
    timeSig: timeSig,
    metronome: currMetronome
  });
  localStorage.setItem('avatar', avatarIndex);
  document.getElementById("save-settings").innerHTML = "Saved";
}

window.onload = function() {
    init();
}
