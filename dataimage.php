<?php


if($_SERVER['REQUEST_METHOD']=='POST'){
  $imagedata = $_POST['imagedata'];
  $filename = $_POST['name'];
  $prize = $_POST['prize'];    
 
  $uriPhp = 'data://' . substr($imagedata, 5);
  $binary = file_get_contents($uriPhp);
  file_put_contents('images/temp.png',$binary);
  echo 'http://ieeenitb.org/facebook/images/temp.png';
}

?>