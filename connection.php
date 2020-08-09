<?php
  $server_name = "localhost";
  $user_name = "root";
  $password = "";
  $db = "valorant";

  $connection = mysqli_connect($server_name, $user_name, $password, $db);

  if(!$connection){
    die("connection failed");
  }
  else {
    echo "Connection Worked";
  }

?>
