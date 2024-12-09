<?php

// Connect to database
// $db = new csa_mysqli ( "csa-sql-test", "app_purchasing_app", "pAPPtest0524!", "purchasing_app" );
$db = new csa_mysqli ( "csa-sql-test", "app_perch", "pAPPtest0524!", "perch" );

if ( $db->connect_errno ) die_json ( "DB Connect Error: " . $db->connect_error );


