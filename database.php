<?php

    $connection = mysqli_connect('localhost','leonel','Nicol','tasks-app');

    if(!$connection) {
        die('Connection Error' . mysqli_error($connection)); 
    }
?>
