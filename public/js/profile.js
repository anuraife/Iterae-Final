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
  return firebase.database().ref('/users/' + uid).once('value').then(function(snapshot) {
    var avatarIndex = (snapshot.val() && snapshot.val().avatar) || 'Blank';
    console.log(avatarIndex);
    document.getElementById('avatar-pic').src = "res/avatars/avatar" + avatarIndex + ".png"
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
