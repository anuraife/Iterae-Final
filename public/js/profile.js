var email = "";
var avatarOpen = false;
var currMetronome = "metronome1";
function init(){
  // Check if logged in
  firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
          var displayName = user.displayName;
          email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          signedIn = true;

          renderProfile(uid);
          if (email) {
            document.getElementById('username').innerHTML = email;
            document.getElementById('username-header').innerHTML = email;
          }

          document.getElementById('sign-out').addEventListener('click', signOut, false);
          document.getElementById('reset-password').addEventListener('click', resetPassword, false);
      } else {
          signedIn = false;
          window.location.href="splash.html";
      }
  });
}

function renderProfile(uid) {
  var avatarIndex = localStorage.getItem('avatar');
  document.getElementById('avatar-pic').src = "res/avatars/avatar" + avatarIndex + ".png";

  firebase.database().ref('/users/' + uid).once('value').then(function(snapshot) {
    var level = (snapshot.val() && snapshot.val().level) || "Unknown";
    var levelStr = level.charAt(0).toUpperCase() + level.slice(1);
    document.getElementById('skill-value').innerHTML = levelStr;

    var joined = (snapshot.val() && snapshot.val().joined) || null;
    var joinedStr = (joined) ? joined.slice(0, 10) : "Unknown";
    document.getElementById('joined').innerHTML = joinedStr;
  });
}

function changeAvatar(){
  console.log('yo');
  if(!avatarOpen){
    document.getElementById('avatar-popup-container').style.display = 'block';

  }
  else{
    document.getElementById('avatar-popup-container').style.display = 'none';
  }
  avatarOpen = !avatarOpen;
}

function selectAvatar(avatarIndex){
  document.getElementById('avatar-pic').src = "res/avatars/avatar" + avatarIndex + ".png"
}


function resetPassword() {
  firebase.auth().sendPasswordResetEmail(email).then(function() {
    alert('Password Reset Email Sent!');
  }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == 'auth/invalid-email') {
      alert(errorMessage);
    } else if (errorCode == 'auth/user-not-found') {
      alert(errorMessage);
    }
    console.log(error);
  });
}

window.onload = function() {
    init();
}
