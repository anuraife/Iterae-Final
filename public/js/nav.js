function initNav() {
	// Check if logged in
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
            getAvatar(uid);
            document.getElementById('sign-out').addEventListener('click', signOut, false);
        } else {
            signedIn = false;
            window.location.href="splash.html";
        }
    });
}

function getAvatar(uid) {
    var avatar = localStorage.getItem('avatar');
    console.log(avatar);
    if (avatar == null) {
        firebase.database().ref('/users/' + uid).once('value').then(function(snapshot) {
            var avatar = (snapshot.val() && snapshot.val().avatar) || 0;
            localStorage.setItem('avatar', avatar);
        });
    }
    
    document.getElementById('nav-avatar').src = "res/avatars/avatar" + avatar + ".png"
    console.log(avatar);
}

function signOut() {
    if (firebase.auth().currentUser) {
        firebase.auth().signOut();
    	window.location.href="splash.html";
    }
}

function menuIcon() {
    var x = document.getElementById("nav");
    if (x.className === "nav") {
        x.className += " responsive";
    } else {
        x.className = "nav";
    }
}

initNav();

