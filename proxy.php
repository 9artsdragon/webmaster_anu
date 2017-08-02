
<?php
   // put your TMDb API key here:
   $api_key = "34460ccf6bb8665a41a8e34aed0de071";

   header("Content-type: application/json\n\n");
   $method = $_GET['method'];
   $params = $_SERVER['QUERY_STRING'];
   $pos = strpos($params,'&');
   if ($pos === false) {
     $host = "http://api.themoviedb.org$method?api_key=$api_key";
   } else {
     $params = substr($params,$pos);
     $host = "http://api.themoviedb.org$method?api_key=$api_key$params";
   };
   $ch = curl_init($host);
   curl_exec($ch);
   curl_close($ch);
?>