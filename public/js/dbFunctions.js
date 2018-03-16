
// Render Badges
function renderBadges(uid, type) {
    var badges = [0, 0, 0, 0, 0, 0, 0];
    firebase.database().ref('/users/' + uid).once('value').then(function(snapshot) {
      badges = (snapshot.val() && snapshot.val().badges) || [0, 0, 0, 0, 0, 0, 0];
      for (i=0; i<7; i++) {
        renderBadge(badges, i, type);
      }
    });
}

function renderBadge(badges, index, type) {
    var modal = document.getElementById("myModal");
    var btn = document.getElementById((index+1).toString());
    btn.onclick = function() {
        var badgeInfo = event.srcElement.id;
        var rect = document.getElementById(badgeInfo).getBoundingClientRect();
        document.getElementById("badgeInfo").innerHTML = renderBadgeText(badgeInfo);
        modal.style.display = "block";
        modal.style.top = (rect.y + 65).toString() + "px";
        modal.style.left = (rect.x - 100).toString() + "px";
    }
    if (badges[index]) {
        if (type == "color") {
            btn.style.filter = "grayscale(0)";
        } else {
            btn.style.display = "inline-block";
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

    renderBadgeText = function(num) {
        return BadgeArray[num-1];
    }
}

function updateStreak(uid, streak, lastPracticed) {
    var now = new Date().setHours(0, 0, 0, 0);
    var prev = new Date(lastPracticed).setHours(0, 0, 0, 0);
    if (prev != now) {
      streak = (prev > now - 86400000) ? streak + 1 : 0; // 86400000 Seconds in a day

      firebase.database().ref().child('/users/' + uid).update({streak: streak})
      .catch(function onError(err) {
        console.log(err);
      });
    }
    return streak;
}