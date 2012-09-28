<?php
$server = "localhost";
$username = "root";
$password = "";
$database = "bapp";

$con = mysql_connect($server, $username, $password) or die ("Could not connect: " . mysql_error());

mysql_select_db($database, $con);

$bugTitle = mysql_real_escape_string($_POST["bug-title"]);
$bugDetails = mysql_real_escape_string($_POST["bug-details"]);
$bugPriority = mysql_real_escape_string($_POST["bug-priority"]);

$sql = "INSERT INTO bugs (title, details, priority) ";
$sql .= "VALUES ('$bugTitle', '$bugDetails', $bugPriority)";

if (!mysql_query($sql, $con)) {
	die('Error: ' . mysql_error());
} else {
	echo "Bug added";
}

mysql_close($con);
?>