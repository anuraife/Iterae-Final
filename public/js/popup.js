// function getURLParameter(name) {
//   return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
// }
function onload() {
  // data = getURLParameter('level');
  // console.log(data);
  console.log(test);
  var parsedURL = new URL(window.location.href);
  var level = parsedURL.searchParams.get("level");
  console.log(level);
  if (data.level == 0)
  {
      document.getElementById('chosenlevel') = "Beginner";
      document.getElementById('chosenbpm') = "100";
  }
 if (data.level==1)
  {
    document.getElementById('chosenlevel') = "Intermediate";
    document.getElementById('chosenbpm') = "150";
  }
  if (data.level==2)
   {
     document.getElementById('chosenlevel') = "Expert";
     document.getElementById('chosenbpm') = "180";
   }
}

window.onload = function () {
  onload()
}
