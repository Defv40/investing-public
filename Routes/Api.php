<?php
	namespace Routes;
	use App\Models\Auth;
	class Api 
	{
		private $pages = [];

		function addRoute($url, $path) {
			$this->pages[$url] = $path;
		}

		function route($url) {
			$authObject = new Auth();
			@$path = $this->pages[$url];
			$file_dir = "../api/".$path;

			if($path == ""){
				require "404.php";
				die('Нет пути');
			}

			if(($this->pages[$url] == 'register.php') || ($this->pages[$url] == 'login.php')){
				require $file_dir;
				die();
			}

			if(file_exists($file_dir) && $authObject->checkToken()) {
					require $file_dir;
			} else {
				require "404.php";
				die('Файла не существует');
			}
		}
	}