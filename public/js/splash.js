function init(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            signedIn = true;
            window.location.href="index.html";
        } else {
            signedIn = false;
        }
    });

	document.getElementById('sign-up').addEventListener('click', signUp, false);
	document.getElementById('log-in').addEventListener('click', logIn, false);
}


function signUp() {
	var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    if (verifyCredentials(email, password)){
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
          handleError(error);
        });
    }
}

function logIn() {
	var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    if (verifyCredentials(email, password)){
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            handleError(error);
        });
    }
}

function verifyCredentials(email, password) {
    console.log(email);
    if (email.length < 7) {
      alert('Please enter a valid email address.');
      return false;
    }
    if (password.length < 6) {
      alert('Password must be at least 6 characters');
      return false;
    }
    return true;
}

function handleError(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode === 'auth/wrong-password') {
      alert('Wrong password.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
}

window.onload = function() {
    init();
}