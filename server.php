<?php
header('Content-Type: application/json');
//sciągamy z supertablicy globalnej
$autorName = $_POST['autorName'];

//$bookName = 'w';

$myJSON = '';

if(!empty($autorName)){    //socket: nazwa servera
    $db = mysqli_connect('localhost', 'root', '', 'biblioteka');//metoda wbudowana php
    $query = 'select * from ksiazki where autor LIKE "'.$autorName. '%"';
    $result = mysqli_query($db, $query);  //wysłanie zapytania bazy danych
    $dataResult = array();
    foreach($result as $key=>$data){
        $dataResult[$key] = $data;
    }
    
    $myJSON = json_encode($dataResult);
    
}

echo $myJSON;
