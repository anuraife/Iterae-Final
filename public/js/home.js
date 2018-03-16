var uid;

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
            renderBadges(uid, "show");
            document.getElementById('sign-out').addEventListener('click', signOut, false);
        } else {
            signedIn = false;
            window.location.href="splash.html";
        }
    });


    // Load in accordina contents
    var acc = document.getElementsByClassName("accordion");
    var i;
    var loggedIn = false;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            }
            else {
                panel.style.display = "block";
            }
        });
    }
};

function changePractice(scale){
    // window.location.href = "practice.html";
    // document.getElementById('scale-name').innerHTML = innerHTML;
    var b = document.getElementById(scale).value;
    window.location.href="practice.html?scale="+ encodeURIComponent(b);
}

window.onload = function() {
    init();
}
