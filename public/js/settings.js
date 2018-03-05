var uid;
var email;
var level;
var avatarIndex;
var bpm;
var timeSig;
var currMetronome = 1;

function init(){
  // Check if logged in
  firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
          var displayName = user.displayName;
          email = user.email;
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

    level = (snapshot.val() && snapshot.val().level) || "Not specified";
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
  var settingsData = {
    username: email,
    avatar: avatarIndex,
    bpm: bpm,
    timeSig: timeSig,
    metronome: currMetronome,
    level: level,
  };

  var updates = {};
  updates['/users/' + uid] = settingsData;
  console.log(settingsData);
  localStorage.setItem('avatar', avatarIndex);
  return firebase.database().ref().update(updates).then(function onSuccess(res) {
    document.getElementById("save-settings").innerHTML = "Saved";
    }).catch(function onError(err) {
      console.log(err);
    });
}

window.onload = function() {
    init();
}
