<?php 
function getConnection(){
    $host = "localhost:3307";
    $db_name = "pert4_npm_db";
    $username = "root";
    $password = "";

    $conn = new mysqli($host, $username, $password, $db_name);
    
    if ($conn->connect_error){
        die("Connection failed: ".$conn->connect_error);
    }
    return $conn;
}
?>