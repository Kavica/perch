<?php //if ( __FILE__ != $_SERVER [ "SCRIPT_FILENAME" ] ) return;
header("Cache-Control: no-cache, no-store, must-revalidate"); // HTTP 1.1.
header("Pragma: no-cache"); // HTTP 1.0.
header("Expires: 0"); // Proxies.
header ( "Content-type: application/json" );
header ( "X-Content-type-options: nosniff" );
ini_set ( "display_errors", "0" );
error_reporting(0);

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
        $result = get_purchases($id, $limit);
		$debug and $result["debug"]["time"] = (floor((microtime(TRUE) - $start_time) * 1000000) / 1000)."ms";
		echo JSON_ENCODE($result, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
        exit;
	case "POST":
		$json = get_input();
		$ret = post_json($json);

        if (is_array($ret)) die_json($ret);

		header ( "HTTP/1.0 201" );
		header ( "Location: $ret" );
		exit;
}

function get_purchases($id) {
    global $db;

    // $sql_base = "
    //     SELECT
    //     p.purchaseId,
    //     JSON_OBJECT(
    //         'purchaseId', p.PurchaseID,
    //         'purchaseTypeId', p.PurchaseTypeID,
    //         'purchaseType', pt.PurchaseType,
    //         'purchaseTypeShort', pt.PurchaseTypeShort,
    //         'fiscalYear', p.FiscalYear,
    //         'requesterESN', p.RequesterESN,
    //         'title', p.title,
    //         'description', p.description,
    //         'stateAPD', p.StateAPD,
    //         'divisionId', p.DivisionID,
    //         'division', d.DivisionName
    //         ) as purchase
    //     FROM purchases p
    //     LEFT JOIN purchase_types pt ON p.PurchaseTypeID=pt.PurchaseTypeID
    //     LEFT JOIN divisions d on d.DivisionID = p.DivisionID
    // ";

    $sql_base = "
        SELECT p.PurchaseID, p.PurchaseTypeID, pt.PurchaseType, pt.PurchaseTypeShort, p.FiscalYear,
        p.RequesterESN, p.title, p.description, p.StateAPD, p.DivisionID, d.DivisionName
        FROM purchases p
        LEFT JOIN purchase_types pt ON p.PurchaseTypeID=pt.PurchaseTypeID
        LEFT JOIN divisions d on d.DivisionID = p.DivisionID
    ";

    $sql = new select_helper($sql_base);
    if ($id) $sql->where_and("p.PurchaseID", "=", $id);
    $sql->limit("100");

    $result = $db->prepare_and_execute($sql->sql, ...$sql->data);
    if ($db->e) die_json($db->e);

    $r = $result->fetch_all(MYSQLI_ASSOC);
    return $r;

}

function post_json($json) {
    global $db, $user_info;

    $post_fields = array(
        "purchaseTypeId", 
        "divisionId", 
        "paymentTypeId",
        "purchaseOrderId",
        "StatusId",
        "fiscalYear",
        "stateAPD",
        "title",
        "description",
        "totalCost",
        "creditCard",
        "requesterESN",
        "purchaseDate",
        "statusDate",
        "ssid"
    );

    //set session data
    $json->ssid = $user_info["ssid"];

    //validate data
    if ($json->purchaseTypeId == null) { return ["PurchaseTypeId property cannot be null."]; }

    $table = "purchases";
    $result = post_to_table($db, $table, $json, $post_fields);
  
	return;
}

function post_to_table($db, $table, $json, $fields) {

    $data = [];
    foreach ($json as $key => $value) {
        if (ignore_case_in_array($key, $fields)) {
            $data[$key] = $value;
        } 
    }

    $result = $db->insert($table, $data);
	if ($db->e) return [$db->e];

    return $db->insert_id;

}