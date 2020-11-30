<?php

    include_once('database.php');

    $id = $_POST['id'];
    $query = "DELETE FROM tasks WHERE id=$id";

    $result = mysqli_query($connection, $query);
    if(!$result) {
        die("Error to Delete Taks." . mysqli_error($connection));
    }
    echo "Task Deleted Successfully.";

?>