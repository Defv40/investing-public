<?php
	namespace App\Models;
	use App\Models\User;
	class Auth
	{
		private $cookie;
		private $userObject; 
		private $users;

		public function checkToken() {
			$this->userObject = new User();
			$this->cookie = $_COOKIE;		
			$this->users = $this->userObject->getUsers();
			foreach ($this->users as $key => $user) {
				if (array_key_exists('token', $this->cookie) && ($user['token'] == $this->cookie['token'])) {
					return true;
				}
			}
			return false;
		}
	}