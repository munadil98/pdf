<?php


// Start the session
session_start();

    // echo 'session: '.$_SESSION["calvalue"];

if(!isset($_SESSION['calvalue']) && empty($_SESSION['calvalue'])) {
	
	 @$_SESSION["calvalue"] = $_POST['calvalue'];
}

echo $_SESSION["calvalue"];

if (@$_POST['destroy']==1) {
	session_destroy();
	$destroy=0;
}

	// session_destroy();
	// $destroy=0;
	
?>

