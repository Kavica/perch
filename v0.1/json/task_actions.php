<?php //if ( __FILE__ != $_SERVER [ "SCRIPT_FILENAME" ] ) return;
header("Cache-Control: no-cache, no-store, must-revalidate"); // HTTP 1.1.
header("Pragma: no-cache"); // HTTP 1.0.
header("Expires: 0"); // Proxies.
header ( "Content-type: application/json" );
header ( "X-Content-type-options: nosniff" );
ini_set ( "display_errors", "1" );
error_reporting(1);

// ini_set('memory_limit','64M');


require_once "user_info.php";
require_once "csa_mysqli.php";
require_once "select_helper.php";
require_once "functions.php";
require_once "mysql_connect.php";
require_once "security.php";
require_once "version.php";


switch ( $_SERVER [ "REQUEST_METHOD" ] ) {

    case "GET":
        echo getTaskActions();
        exit;
    }
    

function getTaskActions() {
    global $db;
    $query = "SELECT taskActionID, Description FROM task_actions WHERE Active = 1";
    $result = $db->query($query);
    if ($result && $rows = $result->fetch_all(MYSQLI_ASSOC)) {
        return json_encode(array_map(function($row) { return array('key' => $row['taskActionID'], 'value' => $row['Description']); }, $rows), JSON_PRETTY_PRINT);
    } else {
        return json_encode(array('error' => 'No task_actions found'), JSON_PRETTY_PRINT);
    }
}

