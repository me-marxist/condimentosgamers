<?php
header('Content-Type: application/json');
$db = new SQLite3(__DIR__ . '/chat.db');
$res = $db->query("SELECT message, timestamp FROM messages ORDER BY id DESC LIMIT 50");
$messages = [];
while ($row = $res->fetchArray(SQLITE3_ASSOC)) {
    $messages[] = $row;
}
echo json_encode(array_reverse($messages));
?>
