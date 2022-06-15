<?php

	namespace App\Models;
	use PDO;

	class DatabaseSingleton
	{
		public static ?PDO $databaseInstance = null;

		public static function getDatabase()
		{
			if (!static::$databaseInstance) {
				static::$databaseInstance = new PDO('mysql:host=localhost;dbname=investing_portfolios_pdo', 'root', 'root');
			}

			return static::$databaseInstance;
		}
	}