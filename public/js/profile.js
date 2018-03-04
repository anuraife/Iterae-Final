var email = "";
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

          renderAvatar(uid);
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

function renderAvatar(uid) {
  // return firebase.database().ref('/users/' + uid).once('value').then(function(snapshot) {
  //   var avatarIndex = (snapshot.val() && snapshot.val().avatar) || "Anonymous";
  //   console.log(avatarIndex);
  //   document.getElementById('avatar').src = "res/avatars/avatar" + avatarIndex + ".png"
  // });
  document.getElementById('avatar-pic').src = "res/avatars/avatar1.png";
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
function ChangeMetronome1(){
  if (currMetronome != "metronome1"){
  document.getElementById("metronome1").style.opacity = 1;
  document.getElementById(currMetronome).style.opacity = 0.4;
  currMetronome = "metronome1";}
}
function ChangeMetronome2(){
  if (currMetronome != "metronome2"){
  document.getElementById("metronome2").style.opacity = 1;
  document.getElementById(currMetronome).style.opacity = 0.4;
  currMetronome = "metronome2";}
}
