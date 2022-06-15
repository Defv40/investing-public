<?php
	namespace Routes;
	use App\Models\User;
	use App\Models\Auth;
	class View
	{
		private $pages = [];

		function addRoute($url, $path) {
			$this->pages[$url] = $path;
		}

		function route($url) {
			$authObject = new Auth();
			@$path = $this->pages[$url];
			$file_dir = "../pages/".$path;

			if($path == ""){
				require "404.php";
				die();
			}

			if(($this->pages[$url] == 'index.html')){
				require $file_dir;
				die();
			}

			if(file_exists($file_dir) && $authObject->checkToken()) {
				require $file_dir;
				die();
			} else {
				require "404.php";
				die();
			}
		}
	}