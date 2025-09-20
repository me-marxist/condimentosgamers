<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $msg = $_POST['message'] ?? '';
    if ($msg) {
        $db = new SQLite3(__DIR__ . '/chat.db');
        $stmt = $db->prepare("INSERT INTO messages (message) VALUES (:msg)");
        $stmt->bindValue(':msg', $msg, SQLITE3_TEXT);
        $stmt->execute();
    }
}
?>
