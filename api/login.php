<?php
	header('application/json');
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
		$users = $userObject->getUsers();
		foreach ($users as $user => $value) {
			if (($value['login'] == $data->login) && ($value['password'] == $data->password)){
				$token = md5(time() . 'salt' . microtime());
				$result = $userObject->updateUserToken($token, $data->login);
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
			}
		}
		echo json_encode("Неверный логин или пароль");
		die();
	} else {
		http_response_code(400);
		$json = array(
			'errors' => $errors
		);
		echo json_encode($json);
		die();
	}
	
?>