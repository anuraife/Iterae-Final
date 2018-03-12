// function getURLParameter(name) {
//   return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
// }
function onLoad() {
  // data = getURLParameter('level');
  // console.log(data);
  var parsedURL = new URL(window.location.href);
  var level = parsedURL.searchParams.get("level");
  console.log(level);
  if (data.level == 0)
  {
      document.getElementById('chosenlevel').innerHTML = "Beginner";
      document.getElementById('chosenbpm').innerHTML = "100";
  }
 if (data.level==1)
  {
    document.getElementById('chosenlevel').innerHTML = "Intermediate";
    document.getElementById('chosenbpm').innerHTML = "150";
  }
  if (data.level==2)
   {
     document.getElementById('chosenlevel').innerHTML = "Expert";
     document.getElementById('chosenbpm').innerHTML = "180";
   }
}
