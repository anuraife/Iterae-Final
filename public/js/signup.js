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
    console.log(email);
    if (email.length < 7) {
      alert('Please enter a valid email address.');
      return false;
    }
    if (password.length < 6) {
      alert('Password must be at least 6 characters');
      return false;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return false;
    }
    return true;
}

function handleSignupError(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
    console.log(error);
}

function goBack() {
    window.history.back();
}

window.onload = function() {
    init();
}