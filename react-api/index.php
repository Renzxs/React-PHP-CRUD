<?php
    // These headers is for avoiding CORS issues
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

    $data = [
        ['id' => 1, 'name' => 'John'],
        ['id' => 2, 'name' => 'Elon'],
    ];

    header('Content-type: application/json');

    if($_SERVER['REQUEST_METHOD'] === 'POST') {
        $new_data = json_decode(file_get_contents("php://input"), true);

        $new_id = isset($new_data['id']) ? $new_data['id'] : null;
        $new_name = isset($new_data['name']) ? $new_data['name'] : null;

        if ($new_id !== null && $new_name !== null) {
            array_push($data, ['id' => $new_id, 'name' => $new_name]);
        }
    }

    echo json_encode($data);
    
    // array_push($data, ['id' => $new_data[id], 'name' => $new_data[name]])
    // echo json_encode($new_data);
?>