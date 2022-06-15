<?php
	namespace App\Models;
	use App\Database;
	use PDO;

	class Active extends Database
	{
		public function showActives($portfolioId)
		{
			$statement = $this->connect->prepare("SELECT cryptocurrency_id, amount FROM `actives` WHERE portfolio_id = :portfolioId");
			$statement->execute(array('portfolioId' => $portfolioId));
			return $statement->fetchAll(PDO::FETCH_ASSOC);
		}

		public function addActive($cryptocurrencyId, $portfolioId, $amount)
		{
			$statement = $this->connect->prepare("INSERT INTO `actives` (cryptocurrency_id, portfolio_id, amount) VALUES (:cryptocurrency_id, :portfolio_id, :amount)");
			$statement->execute(array('cryptocurrency_id'=> $cryptocurrencyId, 'portfolio_id' => $portfolioId, 'amount' => $amount));
			return true;
		}

		public function updateActive($cryptocurrencyId, $portfolioId, $amount)
		{
			$statement = $this->connect->prepare("UPDATE `actives` SET amount = :amount WHERE cryptocurrency_id = :cryptocurrency_id AND portfolio_id = :portfolio_id");
			$statement->execute(array('amount' => $amount, 'cryptocurrency_id'=> $cryptocurrencyId, 'portfolio_id' => $portfolioId));
			return true;
		}

		public function updateAmountActive($cryptocurrencyId, $portfolioId, $amount)
		{
			$statement = $this->connect->prepare("UPDATE `actives` SET amount = :amount WHERE cryptocurrency_id = :cryptocurrency_id AND portfolio_id = :portfolio_id");
			$statement->execute(array('amount' => $amount, 'cryptocurrency_id'=> $cryptocurrencyId, 'portfolio_id' => $portfolioId));
			return true;
		}

		public function removeActive($cryptocurrencyId, $portfolioId)
		{
			$statement = $this->connect->prepare("DELETE FROM `actives` WHERE cryptocurrency_id = :cryptocurrency_id AND portfolio_id = :portfolio_id");
			$statement->execute(array('cryptocurrency_id'=> $cryptocurrencyId, 'portfolio_id' => $portfolioId));
			return true;
		}

		public function getActiveByCryptocurrencyId($cryptocurrencyId,  $portfolioId)
		{
			$statement = $this->connect->prepare("SELECT amount FROM `actives` WHERE cryptocurrency_id = :cryptocurrencyId AND portfolio_id = :portfolioId");
			$statement->execute(array('cryptocurrencyId' => $cryptocurrencyId, 'portfolioId' => $portfolioId));
			return $statement->fetch(PDO::FETCH_ASSOC);
		}
	}