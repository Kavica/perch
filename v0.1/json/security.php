<?php

if ( array_key_exists ( "error", $user_info ) ) {
	die_json ( "UserInfo: $user_info[error]", 401 );
}

if (in_array ("Programmers Users Group", $user_info["groups"]) ) {
	$access = 1;        //programmer test level
} else if (in_array ("Purchasing Admins", $user_info["groups"]) ) {
	$access = 1;        //admin user
} else if (in_array ("Purchasing Users", $user_info["groups"]) ) {
	$access = 0;        //typical user
} else {
    die_json("access denied");
}

// for testing online
// $access = 1;
