<?php
header('Content-Type: application/javascript');
$callback = $_GET['callback'];

// Validation
if(!isset($_GET['name']) || !isset($_GET['message']) || empty($_GET['name']) || empty($_GET['message'])) {
  echo $callback . '({ alert: "Invalid name or message." });';
  exit;
}
if(strlen($_GET['name']) > 10) {
  echo $callback . '({ alert: "Name is too long." });';
  exit;
}
if(strlen($_GET['message']) > 100) {
  echo $callback . '({ alert: "Message is too long." });';
  exit;
}

// Processing
$data = json_decode(file_get_contents('data/chat.json'), true);
$data['messages'][] = [
  'name'    => $_GET['name'],
  'message' => $_GET['message']
];
$data['messages'] = array_slice($data['messages'], -14);
$json = json_encode($data);

file_put_contents('data/chat.json', $json);

require('poll.php');
