<?php
$db = new SQLite3(__DIR__ . '/chat.db');
$db->exec("CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, message TEXT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)");
echo "Banco de dados inicializado.";
?>
