window.onload = function Accordian(){
var acc = document.getElementsByClassName("accordion");
var i;

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

function init(){
    var modal = document.getElementById("myModal");
    console.log(modal);
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

init();

