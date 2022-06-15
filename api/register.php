<?php
	use App\Models\User;
	$userObject = new User;
	$data = json_decode(file_get_contents("php://input"));
	$errors = [];

	foreach($data as $key => $value){
		if ($value == '') {
			$errors[] = ['error_'.$key => "$key must not be empty"];
		}
	}

	if (!$errors) {
		$token = md5(time() . 'salt' . microtime());
		$result = $userObject->createUser($data->email, $data->login, $data->password, $token); 
		if (!$result) {
			die('Неверный запрос');
		} else {
			http_response_code(201);
			$json = array(
				'data' => array(
					'token' => $token
				),
			);
			echo json_encode($json);
			die();
		}
	} else {
		http_response_code(400);
		$json = array(
			'errors' => $errors
		);
		echo json_encode($json);
		die();
	}
?>