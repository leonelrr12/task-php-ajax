<?php   

    include_once('database.php');

    if(isset($_POST['name'])){
        $name = $_POST['name'];
        $description = $_POST['description'];
        $updateId = $_POST['updateId'];

        if($updateId > 0)
            $query = "UPDATE tasks SET name='$name', description='$description' WHERE id=$updateId";
        else 
            $query = "INSERT INTO tasks (name, description) VALUES ('$name', '$description')";

        // echo $query;

        $result = mysqli_query($connection, $query);
        if(!$result) {
            die('Query Insert Failed.');
        }
        echo 'Task Added Successfully.';
    }
?>