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
    
	document.getElementById('log-in').addEventListener('click', logIn, false);
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
    var displayMessage = document.getElementById('displayMessage');
    if (email.length < 7 || !email.includes("@") || !email.includes(".")) {
      displayMessage.innerHTML = 'Please enter a valid email address.';
      return false;
    }
    if (password.length < 6) {
      displayMessage.innerHTML = 'Password must be at least 6 characters';
      return false;
    }
    return true;
}

function handleError(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    var displayMessage = document.getElementById('displayMessage');
    if (errorCode === 'auth/wrong-password') {
      displayMessage.innerHTML = 'Wrong password.';
    } else {
      displayMessage.innerHTML = errorMessage;
    }
    console.log(error);
}

window.onload = function() {
    init();
}