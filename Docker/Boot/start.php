<?php
$url = '/Application/Boot/Boot';
if(file_exists($url)){
    $read = file($url);
    foreach($read as $line){
        $command = trim($line);
        if(substr($command, 0, 1) === '#'){
            continue;
        }
        if(!empty($command)){
            $explode = explode('#', $command, 2);
            exec($explode[0]);
            logger($command . PHP_EOL);
        }
    }
}

function logger($message){
    $log_dir = '/Application/Mount/Log/';
    $mkdir = @mkdir($log_dir, 0744, true);
    $log_file = 'boot.log';
    $log_url = $log_dir . $log_file;
    $data = (string) $message;
    $resource = @fopen($log_url, 'a');
    if($resource === false){
        return $resource;
    }
    flock($resource, LOCK_EX);
    for ($written = 0; $written < strlen($data); $written += $fwrite) {
        $fwrite = fwrite($resource, substr($data, $written));
        if ($fwrite === false) {
            break;
        }
    }
    flock($resource, LOCK_UN);
    fclose($resource);
}

function kill_zombies(){
    $command = 'ps -aux';
    $output = shell_exec($command);
    $output = explode("\n", $output);
    foreach($output as $line){
        $line = trim($line);
        $line = preg_replace('/\s+/', ' ', $line);
        $line = explode(' ', $line);
        if(array_key_exists(1, $line)){
            $pid = $line[1];
            if(
                array_key_exists(7, $line) &&
                strtolower($line[7]) === 'z'
            ){
                $command = 'kill -9 ' . $pid;
                $command = 'ps -f ' . $pid;
                $output = shell_exec($command);
                echo $output . PHP_EOL;
            }
        }
    }
}

//keep init process running with pid 1
while(true){
    kill_zombies();
    sleep((60 * 1));
}