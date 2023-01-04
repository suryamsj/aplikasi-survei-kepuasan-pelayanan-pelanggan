<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

if (function_exists($_GET['function'])) {
    $_GET['function']();
}

function connect()
{
    return mysqli_connect("localhost", "root", "", "rest_api");
}

function select($query)
{
    $con = connect();
    $result = mysqli_query($con, $query);
    $rows = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $rows[] = $row;
    }
    return $rows;
}

function select_data()
{
    $query = select("SELECT COUNT(IF(result = 'Sangat Puas', 1, NULL)) AS sangat_puas, COUNT(IF(result = 'Puas', 1, NULL)) AS puas, COUNT(IF(result = 'Kurang Puas', 1, NULL)) AS kurang_puas, COUNT(IF(result = 'Tidak Puas', 1, NULL)) AS tidak_puas 
    FROM survei");
    $response = [
        'message' => 'success',
        'data' => $query
    ];
    echo json_encode($response);
}

function create()
{
    $con = connect();

    $result = htmlspecialchars($_POST["result"]);

    $query = "INSERT INTO survei VALUES (null, '$result', null)";
    $insert = mysqli_query($con, $query);

    if ($insert) {
        $response = [
            'status' => 201,
            'message' => 'success',
        ];
    } else {
        $response = [
            'status' => 500,
            'message' => 'failed',
        ];
    }
    echo json_encode($response);
}
