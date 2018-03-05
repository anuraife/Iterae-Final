var uid = user.uid;
var selectedLevel = firebase.database().ref('/users/' + uid).then(function(snapshot){
  bpm = (snapshot.val() && snapshot.val().bpm) || 90;
  firebase.database().ref('/users/' + uid).once('value').then(function(snapshot){
  avatarIndex = (snapshot.val() && snapshot.val().avatar) || 1;
  bpm = (snapshot.val() && snapshot.val().bpm) || 90;})
});
var clevel = document.getElementById('chosenlevel');
var cbpm = document.getElementById('chosenbpm');
function init(){
  // var selectedLevel = document.getElementById('level').selectedIndex;
  if (selectedLevel=="0")
  {
    clevel.innerHTML = "Beginner";
    cbpm.innerHTML = "100";
  }
  if (selectedLevel=="1")
  {
    clevel.innerHTML = "Intermediate";
    cbpm.innerHTML = "150";
  }
  if (selectedLevel=="2")
  {
    clevel.innerHTML = "Expert";
    cbpm.innerHTML = "180";
  }
}
window.onload = function(){
  init();
}
