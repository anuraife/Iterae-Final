function onLoad() {
  var parsedURL = new URL(window.location.href);
  var level = parsedURL.searchParams.get("level");
  if (level == 0)
  {
      document.getElementById('chosenlevel').innerHTML = "Beginner";
      document.getElementById('chosenbpm').innerHTML = "100";
  }
 if (level==1)
  {
    document.getElementById('chosenlevel').innerHTML = "Intermediate";
    document.getElementById('chosenbpm').innerHTML = "150";
  }
  if (level==2)
   {
     document.getElementById('chosenlevel').innerHTML = "Expert";
     document.getElementById('chosenbpm').innerHTML = "180";
   }
}
