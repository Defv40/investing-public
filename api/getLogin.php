<?php

	use App\Models\CurrentUser;

	$userObject = new CurrentUser;
	$userLogin = $userObject->getLoginByToken();
	echo json_encode($userLogin);
	die();