var i;
var BadgeArray = ["Level 1 Badge", "Level 2 Badge", "Level 3 Badge", "Level 4 Badge", "Speedster Badge", "100% Accuracy Badge", "Beethoven Badge"]
function init(){
    var modal = document.getElementById("myModal");
    console.log(modal);
    var btns = [];
    var rects = [];
    for (i=1; i<8; i++) {
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
    return BadgeArray[num-1];
}

init();
