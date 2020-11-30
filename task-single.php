<?php 

    include_once('database.php');

    $id = $_POST['id'];
    $query = "SELECT name, description FROM tasks WHERE id = $id";

    $result = mysqli_query($connection, $query);
    if(!$result) die('Error to extract Task for Update.');

    $json = array();
    while($row = mysqli_fetch_array($result)){
        $json[] = array(
            'name' => $row['name'],
            'description' => $row['description'],
            'id' => $id
        );
    }
    $jsonString = json_encode($json);
    echo $jsonString;
?>