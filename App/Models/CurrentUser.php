<?php
	namespace App\Models;

use PDO;
use PDOException;

	class CurrentUser extends User
	{
		public function unsetUserToken()
		{
			$this->connect->beginTransaction();
			$statement = $this->connect->prepare("UPDATE $this->table SET token='' WHERE token = :token");
			try {
				$statement->execute(array('token' => $_COOKIE['token']));
			} catch (PDOException $exeption) {
				return $exeption;
			}
			$this->connect->commit();
			return true;
		}

		public function getUserIdByToken()
		{
			$statement = $this->connect->prepare("SELECT id FROM $this->table WHERE token = :token");
			$statement->execute(array('token' => $_COOKIE['token']));
			$user_id = $statement->fetch(PDO::FETCH_ASSOC);
			return $user_id;
		}

		public function getLoginByToken()
		{
			$statement = $this->connect->prepare("SELECT login FROM $this->table WHERE token = :token");
			$statement->execute(array('token' => $_COOKIE['token']));
			$user_login = $statement->fetch(PDO::FETCH_ASSOC);
			return $user_login;
		}
	}