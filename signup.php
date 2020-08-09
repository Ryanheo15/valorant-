<?php
include 'connection.php';

$first_name = "";
$last_name = "";
$email = "";
$password = "";

if(isset($_POST["submit"])){
  $first_name = $_POST["first_name"];
  $last_name = $_POST["last_name"];
  $email = $_POST["email"];
  $password = $_POST["password"];

  $insert_query = "INSERT INTO valorant VALUES('$first_name', '$last_name', '$email', '$password')";

  $result = mysqli_connect($connection, $insert_query);

  if(!$result) {
    die("QUERY FAILED");
  }

}



 ?>
