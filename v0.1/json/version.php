<?php 
header ( "Cache-control: no-cache" );
header ( "Content-type: application/json" );
header ( "X-Content-type-options: nosniff" );
ini_set ( "display_errors", "1" );
error_reporting(1);

require_once "functions.php";
require_once "user_info.php";
require_once "csa_mysqli.php";
require_once "mysql_connect.php";
require_once "security.php";

// Set version number and production DB name
$version = "Version 0.2";
$prod_db = "purchasing_app";

// Query for database schema
$result = $db->prepare_and_execute("select database()");
if (!$result) die_json("error");

//var_dump($result->fetch_assoc());
$schema = $result->fetch_assoc()["database()"];

// Add extension to version if needed
if ( $schema != $prod_db ) {
	$schema_skip = strlen ( $prod_db ) + 1;
	if ( strpos ( $schema, $prod_db ) !== 0 ) $schema_skip = 0;
	$version .= " " . substr ( $schema, $schema_skip );
}

if ( __FILE__ != $_SERVER [ "SCRIPT_FILENAME" ] ) return;


$output = [];
$output["version"] = strip_tabs_and_newlines($version);
$output["user"]["name"] = $user_info["first_name"]." ".$user_info["last_name"] ;
$output["user"]["esn"] = $user_info["esn"];
$output["user"]["access"] = $access;
echo JSON_ENCODE($output, JSON_PRETTY_PRINT);

exit;
