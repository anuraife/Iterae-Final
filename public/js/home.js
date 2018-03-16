function init(){
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

    //Get badge info on click
    var modal = document.getElementById("myModal");
    var btns = [];
    var rects = [];
    for (i=1; i<5; i++) {
        btns[i] = document.getElementById(i.toString());
        btns[i].onclick = function() {
            var badgeInfo = event.srcElement.id;
            var rect = document.getElementById(badgeInfo).getBoundingClientRect();
            document.getElementById("badgeInfo").innerHTML = renderBadgeText(badgeInfo);
            modal.style.display = "block";
            modal.style.top = (rect.y + 65).toString() + "px";
            modal.style.left = (rect.x - 100).toString() + "px";
        }
    }
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
};

renderBadgeText = function(num) {
    return "Level " + num + " Badge";
}

function changePractice(innerHTML){
    window.location.href = "practice.html";
    document.getElementById('scale-name').innerHTML = innerHTML;

}


function signOut() {
    if (firebase.auth().currentUser) {
        firebase.auth().signOut();
        window.location.href="splash.html";
    }
}

window.onload = function() {
    init();
}

