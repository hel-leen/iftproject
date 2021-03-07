<?php
$post_data = json_decode(file_get_contents('php://input'), true); 
$name = "data_v1/".$post_data['filename'].".txt"; 
$data = $post_data['filedata'];
// write the file to disk
file_put_contents($name, $data);
?>