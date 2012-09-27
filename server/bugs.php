<?php
$server = "localhost";
$username = "root";
$password = "";
$database = "bapp";

$con = mysql_connect($server, $username, $password) or die ("Could not connect: " . mysql_error());

mysql_select_db($database, $con);

$sql = "SELECT id, title FROM bugs WHERE open = TRUE ORDER BY priority, date_time_added";
$result = mysql_query($sql) or die ("Query error: " . mysql_error());

$bugs = array();

while($row = mysql_fetch_assoc($result)) {
	$bugs[] = $row;
}

echo $_GET['jsoncallback'] . '(' . json_encode($bugs) . ');';

mysql_close($con);
?>