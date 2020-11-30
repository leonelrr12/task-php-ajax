<?php

    include_once('database.php');

    $query = "SELECT * FROM tasks";
    $result = mysqli_query($connection, $query);
    if(!$result) die("Error to get all Task List" . mysqli_error($connection));

    $json = array();
    while($row = mysqli_fetch_array($result)){
        $json[] = array(
            'name' => $row['name'],
            'description' => $row['description'],
            'id' => $row['id']
        );
    }
    $jsonString = json_encode($json);
    echo $jsonString;

?>