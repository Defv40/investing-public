<?php

use App\Models\Active;
use App\Models\Cryptocurrency;
use App\Models\Portfolio;

$cryptocurrencyObject = new Cryptocurrency;
$portfolioObject = new Portfolio;
$activeObject = new Active;
$data = json_decode(file_get_contents('php://input'));
$cryptocurrencyId = $cryptocurrencyObject->getCryptoccurencyByUniqueId($data->cryptocurrencyUniqueId);
$portfolioId = $portfolioObject->getPortfolioByUserId();
$result =  $activeObject->updateAmountActive($cryptocurrencyId['id'], $portfolioId['id'], $data->cryptocurrencyAmount);
echo json_encode($result);
die();