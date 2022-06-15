<?php
use App\Models\CurrentUser;
$userObject = new CurrentUser;
$data = json_decode(file_get_contents("php://input"));
$userObject->unsetUserToken($data->token);