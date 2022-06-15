<?php
	namespace App\Models;
	use App\Database;
use PDOException;
use PDO;

	class User extends Database
	{
		protected $table = 'users';

		public function updateUserToken($token, $userLogin)
		{
			$this->connect->beginTransaction(); 
			$statement = $this->connect->prepare("UPDATE $this->table SET token = :token WHERE login = :userLogin");
			try {
				$statement->execute(array('token' => $token, 'userLogin' => $userLogin));
			} catch (PDOException $exeption) {
				return $exeption;
			}
			$this->connect->commit();
			return true;
		}

		public function getUsers()
		{
			$statement = $this->connect->prepare("SELECT * FROM $this->table");
			$statement->execute();
			return $statement->fetchAll(PDO::FETCH_ASSOC);
		}

		public function createUser($email, $login, $password, $token)
		{
			$this->connect->beginTransaction();
			$statement = $this->connect->prepare("INSERT INTO $this->table (email, login, password, token) VALUES (:email, :login, :password, :token)");
			try {
				$statement->execute(array('email' => $email, 'login' => $login, 'password' => $password, 'token' => $token));
			} catch (PDOException $exeption) {
				die($exeption);
			}
			$this->connect->commit();
			return true;
		}
	}