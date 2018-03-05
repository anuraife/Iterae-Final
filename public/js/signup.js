var avatarIndex = 1;

function init(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var userId = user.userId;
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            signedIn = true;

            savePreferences(uid);
        } else {
            signedIn = false;
        }
    });
    document.getElementById("avatar" + avatarIndex.toString()).classList.add("avatar-active")
	document.getElementById('sign-up').addEventListener('click', signUp, false);
}

function selectAvatar(index) {
    document.getElementById("avatar" + avatarIndex.toString()).classList.remove("avatar-active")
    avatarIndex = index;
    document.getElementById("avatar" + avatarIndex.toString()).classList.add("avatar-active")
}


function signUp() {
	var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    if (verifyNewCredentials(email, password, confirmPassword)){
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
          handleSignupError(error);
        });
    }
}

function verifyNewCredentials(email, password, confirmPassword) {
    var displayMessage = document.getElementById('displayMessage');
    if (email.length < 7 || !email.includes("@") || !email.includes(".")) {
      displayMessage.innerHTML = 'Please enter a valid email address.';
      return false;
    }
    if (password.length < 6) {
      displayMessage.innerHTML = 'Password must be at least 6 characters';
      return false;
    }
    if (password !== confirmPassword) {
      displayMessage.innerHTML = 'Passwords do not match';
      return false;
    }
    return true;
}

function handleSignupError(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    document.getElementById('displayMessage').innerHTML = errorMessage;
    console.log(error);
}

function savePreferences(uid) {
  var levelId = document.getElementById("level");
  var level = levelId.options[levelId.selectedIndex].value;
  var signup = firebase.database().ref('users/' + uid).set({
    avatar: avatarIndex,
    level: level
  }).then(function onSuccess(res) {
    localStorage.setItem('avatar', avatarIndex);
    window.location.href="popup.html";
    }).catch(function onError(err) {
      console.log(err);
    });
  console.log(uid);
}

function goBack() {
    window.history.back();
}

window.onload = function() {
    init();
}
