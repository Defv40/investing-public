<?php
	include '../vendor/autoload.php';
	use Routes\View;
	use Routes\Api;
	$api = new Api();
	$url = key($_GET);
	@$url = str_replace('public/', '', $url);
	$view = new View();
	$view->addRoute("/", "index.html");
	$view->addRoute("/portfolio", "portfolio.html");
	$api->addRoute("/api/register", "register.php");
	$api->addRoute("/api/login", "login.php");
	$api->addRoute("/api/searchCryptocurrency", "searchCryptocurrency.php");
	$api->addRoute("/api/logout", "unsetCookie.php");
	$api->addRoute("/api/portfolio", "portfolio.php");
	$api->addRoute("/api/showCryptocurrency", "showCryptocurrency.php");
	$api->addRoute("/api/addActive", "addActive.php");
	$api->addRoute("/api/updateActive", "updateActive.php");
	$api->addRoute("/api/removeActive", "removeActive.php");
	$api->addRoute("/api/getLogin", "getLogin.php");
	if (preg_match('/^api/', $url)) {
		$api->route("/".$url);
	} else {
		$view->route("/".$url);
	}
?>