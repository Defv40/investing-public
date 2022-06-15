<?php

use App\Models\Active;
use App\Models\Cryptocurrency;

$arr = [];
$data = json_decode(file_get_contents('php://input'));
$activeObject = new Active;
$cryptocurrencyObject = new Cryptocurrency;
$actives = $activeObject->showActives($data->portfolio_id);
foreach ($actives as $key => $cryptocurrency) {
	$cryptocurrencyInformation = [];
	$cryptocurrencyInformation = $cryptocurrencyObject->getCryptoccurencyById($cryptocurrency['cryptocurrency_id']);
	$cryptocurrencyInformation += ['amount' =>  $cryptocurrency['amount']];
	$arr[] = $cryptocurrencyInformation;
}
echo json_encode($arr);
die();