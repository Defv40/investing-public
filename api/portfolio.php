<?php
		header('application/json');
		use App\Models\Portfolio;

		$portfolioObject = new Portfolio;
		$data = $portfolioObject->getPortfolioByUserId();

		echo json_encode($data);
		die();
	?>
