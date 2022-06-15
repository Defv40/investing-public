<?php
	header('application/json');
	use App\Models\Cryptocurrency;
	$cryptocurrencyObject = new Cryptocurrency;
	$data = json_decode(file_get_contents("php://input"));

	$cryptocurrency = $cryptocurrencyObject->getCryptocurrencyByName($data->name);
	echo json_encode($cryptocurrency);
	die();
?>