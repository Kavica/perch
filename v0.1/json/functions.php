<?php

function get_memory_usage() {
    $mem_usage = memory_get_usage(true); 
    
    if ($mem_usage < 1024) 
        $mem_usage = "$mem_usage bytes"; 
    elseif ($mem_usage < 1048576) 
        $mem_usage = round($mem_usage/1024,2)." kilobytes"; 
    else 
        $mem_usage = round($mem_usage/1048576,2)." megabytes"; 
        
    return $mem_usage;
} 	

function stdDateTime($mysql) {
	if (!$mysql) return "";
	$phpdate = strtotime($mysql);
	return date("n/j/y g:i a", $phpdate);
}

function stdDate($mysql) {
	if (!$mysql) return "";
	$phpdate = strtotime($mysql);
	return date("n/j/y", $phpdate);
}

function monthFormat($date) {
	$result = explode("/", $date);
	return $result[1]."/".$result[0];
}

function flipDate($date) {
	$result = explode("/", $date);
	if (sizeof($result) == 2) {
		return $result[1]."/".$result[0];
	} else {
		return $date;
	}
}

function stdMonth($mysql) {
	if (!$mysql) return "";
	$phpdate = strtotime($mysql);
	return date("m/Y", $phpdate);	
}

function get_input(){
	$input = file_get_contents ( "php://input" );
	try {
		$input = json_decode ( $input );
	} catch ( Exception $e ) {
		die_json ( "Invalid JSON in request", 422 );
	}
	return $input;
}

function strip_tabs_and_newlines($str) {
	$str = str_replace("\t", "", $str);
	return str_replace("\n", " ", $str);
}

function ignore_case_in_array($needle, $haystack) {
	foreach($haystack as $hay) {
		if (strtolower($hay) == strtolower($needle)) {
			return true;
		}
	}
	return false;
}

function die_json($message, $code = '422') {
	$output = [];
	$output["error"] = strip_tabs_and_newlines($message);
	echo JSON_ENCODE($output, JSON_PRETTY_PRINT);
	header ( "HTTP/1.0 $code" );
	exit;
}



?>