<?php

use App\Models\Active;
use App\Models\Cryptocurrency;
use App\Models\Portfolio;

	$cryptocurrencyObject = new Cryptocurrency;
	$portfolioObject = new Portfolio;
	$activeObject = new Active;
	$data = json_decode(file_get_contents('php://input'));
	$exists_amount = false;
	$cryptocurrencyId = $cryptocurrencyObject->getCryptoccurencyByUniqueId($data->cryptocurrencyUniqueId);
	$portfolioId = $portfolioObject->getPortfolioByUserId();
	$exists_amount = $activeObject->getActiveByCryptocurrencyId(	$cryptocurrencyId['id'], $portfolioId['id']);
	if ($exists_amount) {
		$amount = $data->cryptocurrencyAmount + $exists_amount['amount'];
		$result =  $activeObject->updateActive($cryptocurrencyId['id'], $portfolioId['id'], $amount);
		echo json_encode($result);
		die();
	} else {
		$result = $activeObject->addActive($cryptocurrencyId['id'], $portfolioId['id'], $data->cryptocurrencyAmount);
		echo json_encode($result);
		die();
	}
	// 
