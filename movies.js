//window.onload = function sendRequest(){
function initialize () {
}

function sendRequest () {
   var xhr = new XMLHttpRequest();
   var query = encodeURI(document.getElementById("form-input").value);
   xhr.open("GET", "proxy.php?method=/3/search/movie&query="+query,true);
   xhr.setRequestHeader("Accept","application/json");
   xhr.onreadystatechange = function () {
       if (this.readyState == 4) {
          var json = JSON.parse(this.responseText);
          var str = JSON.stringify(json,undefined,2);
          var disp = '';
          
          disp = '<h2> MOVIE RESULTS :</h2>';
          for(var i=0; i < json.results.length; i++)
          { 
             
                var year = json.results[i].release_date;
                var y = year.substr(0,4);
                     disp = disp + '<h3><ul><a onclick=movieInfo('+json.results[i].id+') href="#">'+json.results[i].original_title+" "+y+'</a></ul></h3>';
                     //The titles are hyperlinked to invoke the movieInfo function to display the details 
          
        }
         // var out = '<p ondblclick="disp" </p>';
         document.getElementById("title").innerHTML = disp + '<br>';

       }
   };
   xhr.send(null);  
} 


function movieInfo(id){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "proxy.php?method=/3/movie/"+id,true);
  xhr.setRequestHeader("Accept","application/json");
   xhr.onreadystatechange = function () {
       if (this.readyState == 4) {
          var json = JSON.parse(this.responseText);
          var str = JSON.stringify(json,undefined,2);
          var disp='';
          var id = json.id;
          var year = json.release_date;
                var y = year.substr(0,4);
          disp = '<center> <img src= "http://image.tmdb.org/t/p/w500/' + json.poster_path + '"/></center><br><h1><center>'+json.original_title+' - '+y+'</h1></center><h2> GENRES : </h2>';
         
           for(i=0;i<json.genres.length;i++)
          {
            disp = disp + '<b>' + json.genres[i].name+'</b>';
            if(i <= json.genres.length-2) //display genres parted by commas
            {
            
              disp += '<b>, </b>';
            }
            
          }
          disp = disp + '<br><h2> OVERVIEW : </h2>';
          document.getElementById("info").innerHTML = disp; 
          document.getElementById("overview").innerHTML = '<b><p>'+ json.overview + '</p></b>';
          window.location.href="#info";
      }
    };
    
    xhr.send(null);  
    movieCredits(id);//Get info by movie ID
}
function movieCredits(id){
  var xhr = new XMLHttpRequest();
   xhr.open("GET", "proxy.php?method=/3/movie/"+id+"/credits",true);
  xhr.setRequestHeader("Accept","application/json");
   xhr.onreadystatechange = function () {
       if (this.readyState == 4) {
          var json = JSON.parse(this.responseText);
          var str = JSON.stringify(json,undefined,2);
          var disp = '';
          disp ='<h2> CAST : </h2>';
          var cast = json.cast;
          for(var i =1; i<=5; i++)
          {
            disp = disp + '<b><ul><li>'+json.cast[i].name+'</li></ul></b>';//display credits
          }
          
          
          document.getElementById("credits").innerHTML = disp; 
          
      }
    };
    
    xhr.send(null);  
}
