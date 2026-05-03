<?php
header('Content-Type: application/javascript');
$callback = $_GET['callback'];

$json = file_get_contents('data/chat.json');

echo $callback . '(' . $json . ');';
