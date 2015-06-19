<?php
if($_SERVER['REQUEST_METHOD']=='POST'){
  $filename = $_POST['filename'];
  unlink($filename);
}
?>