<?php
	namespace App\Models;
	use App\Database;
	use PDO;

	class Cryptocurrency extends Database
	{
		public function getCryptocurrencyByName($name)
		{
			$statement = $this->connect->prepare("SELECT unique_id, name FROM `cryptocurrencies` WHERE name LIKE :name");
			$statement->bindValue('name', "$name%");
			$statement->execute();
			return $statement->fetchAll(PDO::FETCH_ASSOC);
		}

		public function getCryptoccurencyById($id)
		{
			$statement = $this->connect->prepare("SELECT * FROM `cryptocurrencies` WHERE id = :id");
			$statement->execute(array('id' => $id));
			$cryptocurrencies = $statement->fetch(PDO::FETCH_ASSOC);
			return $cryptocurrencies;
		}

		public function getCryptoccurencyByUniqueId($unique_id)
		{
			$statement = $this->connect->prepare("SELECT id FROM `cryptocurrencies` WHERE unique_id = :unique_id");
			$statement->execute(array('unique_id' => $unique_id));
			$cryptocurrency = $statement->fetch(PDO::FETCH_ASSOC);
			return $cryptocurrency;
		}
	}