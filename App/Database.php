<?php

	namespace App;
	use App\Models\DatabaseSingleton;

	class Database 
	{
		public $connect;

		function __construct() 
		{
				$this->connect = DatabaseSingleton::getDatabase();
		}


	}